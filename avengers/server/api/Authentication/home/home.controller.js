'use strict';

var request = require('../../../middleware').securedRequestToGodam();
var redisClient = require('redis').createClient();
var settings = require('../../../constants');
var envJS = require('../../../config/environment/' + process.env.NODE_ENV + '.js');

/*Google API authentication */
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');
var oauth2Client = new OAuth2Client(envJS.CLIENT_ID, envJS.CLIENT_SECRET, envJS.REDIRECT_URL);

var generateAuthURL = function() {
    return oauth2Client.generateAuthUrl({
        access_type: settings.googleAuthConstant.accessType,
        // prompt: 'consent',
        scope: settings.googleAuthConstant.scopes.join(" ") // space delimited string of scopes
    });
}

// Try to authenticate for login and save session in redis
exports.logingid = function(req, res) {
    var sessionKeyToSave = req.headers[settings.SESSION_KEY_NAME];
    redisClient.hset(sessionKeyToSave, "locale", req.body.data.locale)
    var url = generateAuthURL();
    res.send(200, {
        url: url
    });
};

// IF Google Authentication URL is generated successfully then call this function
exports.successLogin = function(req, res, next) {
    /*Code or error provided by google api*/
    var query = req.query;
    var sessionKeyToSave = req.cookies[settings.SESSION_KEY_NAME];
    var locale = 'en';
    redisClient.hgetall(sessionKeyToSave, function(err, value) {
        if (err) {
            // thow err so that it can be monitored
        } else if (!!value) {
            locale = value.locale;
        }
        var godamHost = envJS.godamHost + locale;
        var redirectUrl = settings.godamEndPoints.GOOGLE_AUTH_REDIRECT;
        if (query.code) {
            oauth2Client.getToken(query.code, function(err, tokens) {
                // set tokens to the client
                var uri = godamHost + settings.godamEndPoints.GOOGLE_AUTH;
                if (tokens && tokens.access_token) {
                    var options = {
                        uri: uri,
                        json: {
                            "access_token": tokens.access_token
                        },
                        headers: {
                            application: 'godam_ui'
                        }
                    };
                    oauth2Client.setCredentials(tokens);
                    request.post(options, function(error, response, body) {
                        if (error) {
                            // Looks like we have server error on our side
                            res.redirect(redirectUrl + settings.message.errMsg1);
                        } else if (!response) {
                            // Hmmm.. godam server broke.. ok tell the user
                            res.redirect(redirectUrl + settings.message.errMsg2);

                        } else {
                            if (body && !body.success) {
                                var errorMsg = body.errors ? body.errors[0].error_message : settings.message.errMsg4;
                                res.redirect(redirectUrl + errorMsg);
                            } else {
                                if (body && body.data.is_new) {
                                    redisClient.hset(sessionKeyToSave, "token", body.data.token);
                                    var userDetail = 'isNew&userName=' + body.data.username;
                                    var data = body.success ? userDetail : body.errors;
                                    res.redirect(redirectUrl + data);
                                } else {
                                    // save this authenticated session in redis for obtaining
                                    redisClient.hset(
                                        sessionKeyToSave, "token", body.data.token,
                                        function(err) {
                                            if (err) {
                                                // whaat, could not save the session. oh man tell the
                                                // user about this failure
                                                res.redirect(redirectUrl + settings.message.errMsg3);
                                            } else {
                                                /*Call to Client Profile to get Client Name and Client Sk - Start*/
                                                var options_client = {
                                                    uri: (godamHost + settings.godamEndPoints.GET_USER_PROFILE),
                                                    headers: {
                                                        "Authorization": "Token " + body.data.token
                                                    }
                                                };
                                                request.get(options_client, function(client_error, client_response, client_body) {
                                                    if (client_response && (client_response.statusCode + '') === '200') {
                                                        redisClient.hset(sessionKeyToSave, 'client', client_body);
                                                        res.redirect('/select/fc?authParam=false');
                                                    } else {
                                                        res.redirect(redirectUrl + settings.message.errMsg4);
                                                    }
                                                });
                                            }
                                        });
                                }
                            }
                        }
                    });
                } else {
                    res.redirect(redirectUrl + settings.message.errMsg1);
                }
            });
        } else {
            res.redirect(redirectUrl + req.query.error);
        }
    });
};

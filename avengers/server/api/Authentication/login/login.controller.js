'use strict';

var envJS = require('../../../config/environment/' + process.env.NODE_ENV + '.js');
var request = require('../../../middleware').securedRequestToGodam();
var redisClient = require('redis').createClient();
var settings = require('../../../constants');

var envJS = require('../../../config/environment/' + process.env.NODE_ENV + '.js');

// Try to authenticate for login and save session in redis
exports.login = function(req, res) {
    // session key with which this login is performed
    var sessionKeyToSave = req.headers[settings.SESSION_KEY_NAME];
    var godamHost = envJS.godamHost + req.body.locale;
    var uri = godamHost + settings.godamEndPoints.AUTHENTICATION_URI;
    // Prepare for hitting godam
    var options = {
        uri: uri,
        json: req.body,
        headers: {
            application: 'client_pannel'
        }
    };
    // Okay now try authentication
    request.post(options, function(error, response, body) {
        // trasnform response obtained from godam
        // are we authenticated
        if (response && (response.statusCode === 200)) {
            //sve locale
            redisClient.hset(sessionKeyToSave, 'locale', req.body.locale);
            // save this authenticated session in redis for obtaining
            // auth-token returned in future
            redisClient.hset(
                sessionKeyToSave, "token", body.data.token,
                function(err) {
                    if (err) {
                        // whaat, could not save the session. oh man tell the
                        // user about this failure
                        res.status(500)
                            .json({
                                message: settings.message.errMsg3
                            });
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
                                res.send(200, {
                                    url: '/select/client'
                                });
                            } else {
                                res.status(client_response ? client_response.statusCode : 500).json({
                                    message: settings.message.errMsg4
                                });
                            }
                        });
                    }
                }
            );
        } else {
            // could not authenticate, tell the user to try again
            if (body && !body.success) {
                res.status(response ? response.statusCode : 500).send(body ? body : settings.message.errMsg5);
            } else {
                res.status(response ? response.statusCode : 500).json({
                    message: response ? settings.message.errMsg5 : settings.message.errMsg6
                });
            }
        }
    });
};
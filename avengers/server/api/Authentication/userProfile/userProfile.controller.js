'use strict';

var redisClient = require('redis').createClient(),
    request = require('../../../middleware').securedRequestToGodam(),
    settings = require('../../../constants');

var envJS = require('../../../config/environment/' + process.env.NODE_ENV + '.js');

exports.userprofile = function(req, res, next) {
    var sessionKeyToVerify = req.headers[settings.SESSION_KEY_NAME];
    redisClient.hgetall(
        sessionKeyToVerify,
        function(err, response) {
            if (err) {
                // whaat, could not get the session key. oh man tell the
                // user about this failure
                res.status(500).json({
                    err: err
                });
            } else if (!!!response) {
                // Seems, there is no such session saved.. Seems,
                // unauthenticated request
                res.status(401).json({});
            } else {
                if (typeof response.client === "undefined") {
                    // if login and precondition not set
                    res.status(403).json({});
                } else {
                    // oka, successfully got the saved auth-token, now proceed
                    // precondition is set successfully
                    /*Send data stored in redis server*/
                    res.status(200).json({
                        client: response.client,
                        locale: response.locale,
                        clientDetail: response.clientDetail,
                        userPermission: response.userPermission
                    });
                }
            }
        });
};

exports.getUserPermission = function(req, res, next) {
    var godamHost = envJS.godamHost + req.headers.locale;
    var sessionKeyToSave = req.headers[settings.SESSION_KEY_NAME];

    var uri = godamHost + settings.godamEndPoints.GET_USER_PERMISSION;
    var options = {
        uri: uri,
        headers: {
            Authorization: req.headers.Authorization
        },
        qs: {
            client_sk: req.query.sk
        }
    };
    request.get(options, function(error, response, body) {
        if (error) {
            // Looks like we have server error on our side
            res.status(500).json({
                message: settings.message.errMsg1
            });

        } else if (!!!response) {
            // Hmmm.. godam server broke.. ok tell the user
            res.status(500).send({
                message: settings.message.errMsg2
            });

        } else {
            // successful tranformation
            redisClient.hset(sessionKeyToSave, 'clientDetail', req.query.clientDetail);
            redisClient.hset(sessionKeyToSave, 'userPermission', JSON.parse(body).data);
            res.send(response ? response.statusCode : 500, body);
        }
    });

};

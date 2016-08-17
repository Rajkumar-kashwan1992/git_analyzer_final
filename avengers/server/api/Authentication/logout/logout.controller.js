'use strict';

var _ = require('lodash'),
    redisClient = require('redis').createClient(),
    settings = require('../../../constants');
var request = require('../../../middleware').securedRequestToGodam();
var envJS = require('../../../config/environment/' + process.env.NODE_ENV + '.js');
var clientData = require('../clientData/clientData');

// Get list of logouts
exports.logout = function(req, res) {
    var godamHost = envJS.godamHost + req.headers.locale;
    var uri = godamHost + settings.godamEndPoints.LOGOUT;
    var options = {
        uri: uri,
        headers: {
            Authorization: req.headers.Authorization
        }
    };
    // session key with which this login is performed

    var sessionKeyToDelete = req.headers[settings.SESSION_KEY_NAME] || req.cookies[settings.SESSION_KEY_NAME];

    // Check whether session key sent is true when type casted to boolean
    if (!!!sessionKeyToDelete) {

        // uhhh.. no session key sent to logout > bad request
        res.send(400, {
            message: settings.message.errMsg7
        });

    } else if (!settings.SESSION_KEY_PATTERN.test(sessionKeyToDelete)) {

        // Session key sent but invalid according current regex pattern
        // it should match
        res.status(400).json({
            message: settings.message.errMsg8
        });

    } else {

        request.post(options, function(error, response, body) {
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
                clientData.data.deleteSession(sessionKeyToDelete, res, body);
            }
        });

    }

};

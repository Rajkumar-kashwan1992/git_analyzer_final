'use strict';

var redisClient = require('redis').createClient(),
    settings = require('../../../constants');

// Get list of verifySessions
exports.verifysession = function(req, res) {

    // session key with which this login is performed
    var sessionKeyToVerify = req.headers[settings.SESSION_KEY_NAME];
    // Check whether session key sent is true when type casted to boolean
    if (!!!sessionKeyToVerify) {

        // uhhh.. no session key sent to verify > bad request
        res.status(400).json({
            success: false
        });

    } else if (!settings.SESSION_KEY_PATTERN.test(sessionKeyToVerify)) {

        // Session key sent but invalid accroding current regex pattern
        // it should match
        res.status(400).json({
            success: false
        });

    } else {
        // Fire on redis command to get the key
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
                    res.status(401).json({
                        success: false
                    });
                } else {
                    if (typeof response.client === "undefined") {
                        // if login and precondition not set
                        res.status(403).json({
                            success: false
                        });
                    } else {
                        // oka, successfully got the saved auth-token, now proceed
                        // precondition is set successfully
                        res.status(200).json({
                            success: true
                        });
                    }
                }
            });
    }
};

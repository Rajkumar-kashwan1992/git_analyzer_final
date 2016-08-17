/**
 * Main application constants used server wide
 */
'use strict';
var redisClient = require('redis').createClient(),
    settings = require('../../../constants');

exports.data = {
    setData: function(key, name, value) {
        redisClient.hset(key, name, value);
    },
    fetchData: function(key, res) {
        redisClient.hgetall(
            key,
            function(err, response) {
                if (err) {
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
                    res.send(response ? 200 : 500, response.rePrintData);
                }
            }
        );
    },
    deleteSession: function(key, res, body) {
        redisClient.del(
            key,
            function(err) {
                if (err) {
                    // what, could not delete the session. oh man tell the
                    // user about this failure
                    res.send(500, {
                        message: settings.message.errMsg9
                    });
                } else {
                    // oka, successfully saved auth-token, now proceed
                    res.send(200, body);
                }
            });
    }
};

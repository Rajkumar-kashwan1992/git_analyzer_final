/**
 * Main application middlewares that can be used server wide
 */
'use strict';

var redisClient = require('redis').createClient(6379, '127.0.0.1'),
    settings = require('./constants'),
    request = require("request");

var fs = require('fs'),
    path = require('path'),

    certFile = path.resolve(__dirname, 'delcerts/STAR_delhivery_com.crt'),
    keyFile = path.resolve(__dirname, 'delcerts/server.key');

// This middleware is used to insert auth token in the headers and
// client_sk, fc_sk and Flow in query params
// so that it can be forwarded to Godam
exports.insertAuthToken = function(req, res, next) {

    // get the session key with which intercepted request is done
    var sessionKey = req.headers[settings.SESSION_KEY_NAME];

    if (!!sessionKey) {
        // Since there is a session key in the header we should get auth
        // token from redis
        redisClient.hgetall(sessionKey, function(err, value) {
            if (err) {
                // thow err so that it can be monitored
                throw err;
            } else if (!!value) {
                // yeah, found token oka, insert token,
                // client_sk, fc_sk and Flow
                req.headers.Authorization = 'Token ' + value.token;
                req.headers.locale = value.locale;
                req.query.flow = 'BS';
                req.query.fulfillment_mode = 'BS';
            }
            next();
        });
    } else {
        // No session.. no problem just jump to next middleware
        next();
    }

};

// This middleware is used to add login required check.
exports.loginRequired = function(req, res, next) {
    if (typeof req.headers[settings.SESSION_KEY_NAME] === 'undefined') {
        // No no, without session key user cannot proceed.. throw bad request
        res.status(400).json({
            message: settings.message.errMsg12
        });
    } else if (typeof req.headers.Authorization === 'undefined') {
        // seems, that the session sent is not authorized by the middleware
        res.status(401).json({
            message: settings.message.errMsg13
        });
    } else {
        // session sent is authorized, jump to next middleware
        next();
    }
};

// Secured reuest for godam.
exports.securedRequestToGodam = function(req, res, next) {

    var secureRequest = require('request').defaults({
        rejectUnauthorized: false,
        agentOptions: {
            cert: fs.readFileSync(certFile),
            key: fs.readFileSync(keyFile),
            securityOptions: 'SSL_OP_NO_SSLv3'
        }
    });
    return secureRequest;
};

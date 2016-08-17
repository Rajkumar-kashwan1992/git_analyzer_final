'use strict';

var _ = require('lodash'),
    request = require('../../../../middleware').securedRequestToGodam(),
    settings = require('../../../../constants');
var envJS = require('../../../../config/environment/' + process.env.NODE_ENV + '.js');

exports.resetPassword = function(req, res) {
    var reqBody = req.body;
    var godamHost = envJS.godamHost + reqBody.locale;
    var uri = godamHost + settings.godamEndPoints.GODAM_RESET_PASSWORD + reqBody.token + '/';
    var options = {
        uri: uri,
        json: reqBody,
    };
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
            res.status(response.statusCode).json(body);

        }
    });
};

exports.validateToken = function(req, res) {
    var query = req.query;
    var godamHost = envJS.godamHost + query.locale;
    var uri = godamHost + settings.godamEndPoints.GODAM_RESET_PASSWORD + query.token + '/';
    var options = {
        uri: uri,
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
            res.status(response.statusCode).json(body);

        }
    });
};

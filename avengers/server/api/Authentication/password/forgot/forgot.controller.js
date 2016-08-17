'use strict';

var _ = require('lodash'),
    request = require('../../../../middleware').securedRequestToGodam(),
    settings = require('../../../../constants');

var envJS = require('../../../../config/environment/' + process.env.NODE_ENV + '.js');

// Get list of forgotpasswords
exports.forgotPassword = function(req, res) {
    var godamHost = envJS.godamHost + req.body.locale;
    var uri = godamHost + settings.godamEndPoints.GODAM_FORGOT_PASSWORD;
    var options = {
        uri: uri,
        json: req.body,
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

'use strict';

var request = require('../../../middleware').securedRequestToGodam(),
    settings = require('../../../constants');

var envJS = require('../../../config/environment/' + process.env.NODE_ENV + '.js');

// Get list of logouts
exports.getClient = function(req, res) {
    var godamHost = envJS.godamHost + req.headers.locale;
    var uri = godamHost + settings.godamEndPoints.GET_AUTOCOMPLETE_DATA;
    var query = req.query;
    if(query.noModeRequired){
        delete query.flow;
        delete query.fulfillment_mode;
        delete query.noModeRequired;
    }
    var options = {
        uri: uri,
        headers: {
            Authorization: req.headers.Authorization
        },
        qs: query,
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
            // Cool... client list godam's response status and, body after
            // successful tranformation
            res.send(response ? response.statusCode : 500, body);

        }
    });
};

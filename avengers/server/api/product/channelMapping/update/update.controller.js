'use strict';
var queryString = require('querystring');
var request = require('../../../../middleware').securedRequestToGodam(),
    settings = require('../../../../constants');

var envJS = require('../../../../config/environment/' + process.env.NODE_ENV + '.js');

exports.updateProduct = function(req, res) {

    var godamHost = envJS.godamHost + req.headers.locale;
    var uri = godamHost + settings.godamEndPoints.UPDATE_PROD_CHANNEL_MAPING + req.query.prod_sk + '/?' + 'access_key=' + req.query.access_key;
    var options = {
        uri: uri,
        headers: {
            Authorization: req.headers.Authorization
        },
        json: req.body
    };
    request.put(options, function(error, response, body) {
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
            res.send(response ? response.statusCode : 500, body);

        }
    });
};
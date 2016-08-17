'use strict';

var request = require('../../../middleware').securedRequestToGodam(),
    settings = require('../../../constants'),
    envJS = require('../../../config/environment/' + process.env.NODE_ENV + '.js'),
    queryString = require('querystring');

exports.addCourier = function(req, res) {
	var params = req.query;
	var comsHost = envJS.comsHost;
    var paramList = req.query;

    var uri = comsHost + settings.godamEndPoints.ADD_PCC;
    var options = {
        uri: uri,
        headers: {
            Authorization: 'Token ' + envJS.COMS_ACCESS_TOKEN,
            'Content-Type': 'application/json'
        },
        json: req.body
    };

    request.post(options, function(error, response, body) {
        if (error) {
            // Looks like we have server error on our side
            res.status(500).json({
                message: settings.message.errMsg1
            });

        } else if (!!!response) {
            // Hmmm.. coms server broke.. ok tell the user
            res.status(500).send({
                message: settings.message.errMsg1
            });

        } else {
            // successful tranformation
            res.send(response ? response.statusCode : 500, body);

        }
    });
}

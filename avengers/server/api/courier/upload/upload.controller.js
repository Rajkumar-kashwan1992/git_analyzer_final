'use strict';

var request = require('../../../middleware').securedRequestToGodam(),
    settings = require('../../../constants'),
    envJS = require('../../../config/environment/' + process.env.NODE_ENV + '.js'),
    queryString = require('querystring');



exports.uploadServiceability = function(req, res) {
    var comsHost = envJS.comsHost;

    var options = {
        url: comsHost + '/api/couriers/serviceability/' + "?" + queryString.stringify(req.query),
        headers: {
            "Authorization": 'Token ' + envJS.COMS_ACCESS_TOKEN
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
                 message: settings.message.errMsg15
             });
         } else if(response.statusCode === 404){
             // successful tranformation
             res.status(404).send({
                status: 404,
                message: settings.message.errMsg14
             });
         } else {
             // successful tranformation
             res.send(response ? response.statusCode : 500, body);
         }
    });
}

exports.uploadWaybill = function(req, res) {
    var comsHost = envJS.comsHost;
    var params = req.query;

    var options = {
        url: comsHost + 'api/couriers/' + params.client_courier + '/upload_waybill/' + "?" + queryString.stringify( params ),
        headers: {
            "Authorization": 'Token ' + envJS.COMS_ACCESS_TOKEN
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
                 message: settings.message.errMsg15
             });
         } else if(response.statusCode === 404){
             // successful tranformation
             res.status(404).send({
                status: 404,
                message: settings.message.errMsg14
             });
         } else {
             // successful tranformation
             res.send(response ? response.statusCode : 500, body);
         }
    });
}

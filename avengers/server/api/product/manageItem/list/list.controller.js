'use strict';

var request = require('../../../../middleware').securedRequestToGodam(),
    settings = require('../../../../constants'),
    envJS = require('../../../../config/environment/' + process.env.NODE_ENV + '.js'),
    queryString = require('querystring');

exports.getItemList = function(req, res) {

	var godamHost = envJS.godamHost + req.headers.locale;
    var paramList = req.query;
    delete paramList.flow;
    delete paramList.fulfillment_mode;
    var uri = godamHost + settings.godamEndPoints.GET_ITEM_LIST + '?' + queryString.stringify(paramList);
    var options = {
        uri: uri,
        headers: {
            Authorization: req.headers.Authorization
        }
    };

    request.get(options, function(error, response, body) {
         if (error) {
    		// Looks like we have server error on our side
             res.status(500).json({
                 message: settings.message.errMsg1
             });

         } else if (!!!response) {
             // Hmmm.. server broke.. ok tell the user
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

exports.downloadCSV = function(req, res) {
    var godamHost = envJS.godamHost + req.headers.locale;
    req.query.report = 'Minimum';
    var query = req.query;
    delete query.flow;
    delete query.fulfillment_mode;
    var uri = godamHost + settings.godamEndPoints.GET_ITEM_LIST + '?' + queryString.stringify(req.query);
    var options = {
        uri: uri,
        headers: {
            Authorization: req.headers.Authorization,
            Accept: 'text/csv'
        }
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
'use strict';

var request = require('../../../../middleware').securedRequestToGodam(),
    settings = require('../../../../constants'),
    envJS = require('../../../../config/environment/' + process.env.NODE_ENV + '.js'),
    queryString = require('querystring');

exports.getChannelMappingProductList = function(req, res) {

	var params = req.query;
    delete params.flow;
    delete params.fulfillment_mode;
	var godamHost = envJS.godamHost + req.headers.locale;
    var uri = godamHost + settings.godamEndPoints.PROD_CHANNEL_MAPPING_LIST + '?' + queryString.stringify(params);
    var options = {
        uri: uri,
        headers: {
            Authorization: req.headers.Authorization, // Authorization token sent in headers.
            'Content-Type': 'application/json'
        }
    };

    request.get(options, function(error, response, body) {
         if (error) {
    		/*
    		*	error on node server.
    		*/
             res.status(500).json({
                 message: settings.message.errMsg1
             });
         } else if (!!!response) {
             /*
             *	error on coms server.
             */
             res.status(500).send({
                 message: settings.message.errMsg15
             });

         } else if(response.statusCode === 404){
             /*
             *	request is successful but godam does not have what we asked for.
             */
             res.status(404).send({
             	status: 404,
             	message: settings.message.errMsg14
             });

         } else {
            /* 
            *	successfully Done.
            *	sending body to front end.
            */
             res.send(response ? response.statusCode : 500, body);

         }
    });
};

exports.downloadCSV = function(req, res) {
};

'use strict';

var request = require('../../../../middleware').securedRequestToGodam(),
    settings = require('../../../../constants'),
    envJS = require('../../../../config/environment/' + process.env.NODE_ENV + '.js'),
    queryString = require('querystring');

exports.getProductList = function(req, res) {

	var godamHost = envJS.godamHost + req.headers.locale;
    var query = req.query;
    delete query.fulfillment_mode;
    delete query.flow;
    var uri = godamHost + settings.godamEndPoints.GET_PROD_LIST + '?' + queryString.stringify(query);
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

exports.getProdInvList = function(req, res) {
    var godamHost = envJS.godamHost + req.headers.locale;
    var query = req.query;
    delete query.fulfillment_mode;
    delete query.flow;
    var uri = godamHost + settings.godamEndPoints.PROD_INV_LIST + '?' + queryString.stringify(query);
    var options = {
        uri: uri,
        headers: {
            Authorization: req.headers.Authorization, // Authorization token sent in headers.
            'Content-Type': 'application/json'
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
               message: settings.message.errMsg2
           });

        } else {
           // successful tranformation
           res.send(response ? response.statusCode : 500, body);

        }
    });
};

exports.editProduct = function(req, res) {

    var godamHost = envJS.godamHost + req.headers.locale;
    var query = req.query;
    delete query.fulfillment_mode;
    delete query.flow;
    var uri = godamHost + settings.godamEndPoints.EDIT_PRODUCT + query.prod_sk + '?access_key=' + query.access_key;
    var options = {
        uri: uri,
        headers: {
            Authorization: req.headers.Authorization, // Authorization token sent in headers.
            'Content-Type': 'application/json'
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
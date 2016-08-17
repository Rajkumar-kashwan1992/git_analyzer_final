'use strict';
var queryString = require('querystring');
var request = require('../../../../middleware').securedRequestToGodam(),
    clientData = require('../../../Authentication/clientData/clientData'),
    settings = require('../../../../constants');
var envJS = require('../../../../config/environment/' + process.env.NODE_ENV + '.js');

exports.getProductDetail = function(req, res) {
    var godamHost = envJS.godamHost + req.headers.locale;
    var query = req.query;
    var uri = godamHost + settings.godamEndPoints.GET_QC_ITEM_PROD_DETAIL + query.prod_sk + '?access_key=' + query.access_key;
    var options = {
        uri: uri,
        headers: {
            Authorization: req.headers.Authorization
        },
        qs: query
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

exports.getPcmsProdDetail = function(req, res) {
    var dsnsHost = envJS.dsnsHost;
    var query = req.query;
    var uri = dsnsHost + settings.godamEndPoints.GET_PCMS_DETAIL + query.pcms_id + '/?access_key=' + query.access_key;
    var options = {
        uri: uri,
        headers: {
            Authorization: 'token ' + envJS.PCMS_ACCESS_TOKEN,
            accept: 'application/json; version=0.1'
        },
        qs: {
            account: envJS.PSMS_ACCOUNT_ID
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
        } else if (response.statusCode === 401) {
            res.send(response.body);
        } else {
            // successful tranformation
            res.send(response ? response.statusCode : 500, body);
        }
    });
};
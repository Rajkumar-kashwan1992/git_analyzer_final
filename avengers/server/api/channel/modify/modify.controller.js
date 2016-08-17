'use strict';

var request = require('../../../middleware').securedRequestToGodam(),
    settings = require('../../../constants'),
    envJS = require('../../../config/environment/' + process.env.NODE_ENV + '.js'),
    queryString = require('querystring');

// Get Channel list
exports.modifyChannel = function(req, res) {
    var godamHost = envJS.godamHost + req.headers.locale;
    var params = req.query;
    var uri = godamHost + settings.godamEndPoints.MODIFY_CHANNEL + params.channel_id + '/';
    var options = {
        uri: uri,
        json : req.body,
        headers: {
            Authorization: req.headers.Authorization
        },
        qs: params,
    };
    console.log(options);
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

         } else if(response.statusCode === 404){
             // successful tranformation
             res.status(404).send({
             	status: 404,
             	//message: settings.message.errMsg14
             });

         } else {
             // successful tranformation
             res.send(response ? response.statusCode : 500, body);

         }
     });
};
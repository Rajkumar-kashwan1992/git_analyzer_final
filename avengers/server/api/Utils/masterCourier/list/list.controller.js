'use strict';

var request = require('../../../../middleware').securedRequestToGodam(),
    settings = require('../../../../constants'),
    envJS = require('../../../../config/environment/' + process.env.NODE_ENV + '.js'),
    queryString = require('querystring');

exports.getPMCList = function(req, res) {
    var params = req.query;
    var comsHost = envJS.comsHost;
    var paramList = req.query;
    var uri = comsHost + settings.godamEndPoints.GET_PMC_LIST; // + '?' + queryString.stringify(paramList);
    var options = {
        uri: uri,
        headers: {
            Authorization: 'Token ' + envJS.COMS_ACCESS_TOKEN, //req.headers.Authorization
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

         } else if(response.statusCode === 404){
             // successful tranformation
             res.status(404).send({
                status: 404,
                // message: settings.message.errMsg14
             });

         } else {
             // successful tranformation
             res.send(response ? response.statusCode : 500, body);
         }
    });
}

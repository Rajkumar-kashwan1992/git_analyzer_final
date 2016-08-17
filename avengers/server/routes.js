/**
 * Main application routes
 */
'use strict';

var errors = require('./components/errors');
var middlewares = require('./middleware');

module.exports = function(app) {

    // Insert routes below
    app.all('/api/*', middlewares.insertAuthToken);

    app.use('/api/login-gid', require('./api/Authentication/home'));
    app.use('/api/login', require('./api/Authentication/login'));
    app.use('/api/logout', require('./api/Authentication/logout'));
    app.use('/api/verifySession', require('./api/Authentication/verifySession'));
    app.use('/api/forgotpassword', require('./api/Authentication/password/forgot'));
    app.use('/api/resetpassword', require('./api/Authentication/password/reset'));
    app.use('/api/getAutoCompleteData', require('./api/Utils/clientSelection'));
    app.use('/api/user-profile', require('./api/Authentication/userProfile'));
    app.use('/api/changePassword', require('./api/Authentication/password/change'));
    app.use('/api/channelList' , require('./api/channel/list'));
    app.use('/api/addChannel' , require('./api/channel/add'));
    app.use('/api/channelDetail', require('./api/channel/detail'));
    app.use('/api/channelModify', require('./api/channel/modify'));
    app.use('/api/masterChannelList' , require('./api/Utils/masterChannel/list'));
    app.use('/api/masterChannelDetail' , require('./api/Utils/masterChannel/detail'));
    app.use('/api/courierList' , require('./api/courier/list'));
    app.use('/api/courierModify' , require('./api/courier/modify'));
    app.use('/api/courierAdd' , require('./api/courier/add'));
    app.use('/api/download' , require('./api/courier/download'));
    app.use('/api/upload' , require('./api/courier/upload'));
    // app.use('/api/pmcList' , require('./api/courier/details'));
    app.use('/api/pmcList' , require('./api/Utils/masterCourier/list'))
    app.use('/api/product/manageItem/list', require('./api/product/manageItem/list'));
    app.use('/api/itemDetail', require('./api/product/manageItem/detail'));
    app.use('/api/product/manageProduct/list', require('./api/product/manageProduct/list'));
    app.use('/api/product/channelMapping/list', require('./api/product/channelMapping/list'));
    app.use('/api/product/channelMapping/update', require('./api/product/channelMapping/update'));
    app.use('/api/product/manageProduct/detail', require('./api/product/manageProduct/detail'));
    // All undefined asset or api routes should return a 404

    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function(req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};

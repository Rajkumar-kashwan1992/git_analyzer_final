/**
 * Main application constants used server wide
 */
'use strict';

var _ = require('lodash');

var envJS = require('./config/environment/' + process.env.NODE_ENV + '.js');


/**************************************************
 * Settings for time zone to be used project wide *
 *************************************************/
exports.TIME_ZONE = 'Asia/Kolkata';
exports.UTC_TIME = new Date(0);

/********************************************
 * Settings for session management handling *
 *******************************************/
exports.SESSION_KEY_NAME = 'sessionkey';
exports.SESSION_KEY_PATTERN = /^\w{10,}$/;

/***************************
 * Setting godam endpoints *
 **************************/

// defining endpoints to be transformed
var version = 'v1';

exports.godamEndPoints = {
    AUTHENTICATION_URI: '/api/device/' + version + '/login/',
    GODAM_FORGOT_PASSWORD: '/api/password/recover/',
    GODAM_RESET_PASSWORD: '/api/password/reset/',
    CHANGE_PASSWORD: '/api/password/change/',
    GET_USER_PROFILE: '/management/api/' + version + '/userprofile/',
    GET_USER_PERMISSION: '/management/api/' + version + '/userpermissions/',
    GET_AUTOCOMPLETE_DATA: '/management/api/' + version + '/autocomplete/',
    GET_CHANNEL_LIST: '/management/api/' + version + '/client-stores/',
    GET_CHANNEL_DETAIL : '/management/api/' + version + '/client-store/',
    ADD_CHANNEL : '/management/api/' + version + '/client-store/create/',
    MODIFY_CHANNEL : '/management/api/' + version + '/client-store/update/',
    GET_MASTER_CHANNEL_LIST: '/management/api/' + version + '/master-channels/',
    GET_MASTER_CHANNEL_DETAIL: '/management/api/' + version + '/master-channel/',
    GET_COURIER_LIST: '/api/couriers/client/list/',
    UPDATE_COURIER: '/api/couriers/client/update/',
    GET_PMC_LIST: '/api/couriers/master/list/',
    ADD_PCC: '/api/couriers/client/add/',
    GET_PROD_LIST: '/pcm/api/' + version + '/products/',
    PROD_INV_LIST : '/pcm/api/' + version + '/productinventory/',
    PROD_CHANNEL_MAPPING_LIST : '/pcm/api/' + version + '/productchannelmapping/',
    UPDATE_PROD_CHANNEL_MAPING : '/pcm/api/' + version + '/productchannelmapping/edit/',
    EDIT_PRODUCT : '/pcm/api/' + version + '/product/edit/',
    GET_QC_ITEM_PROD_DETAIL: '/pcm/api/' + version + '/product/',
    GET_PCMS_DETAIL: 'pcms/api/products/details/',
    GET_ITEM_LIST: '/ims/api/' + version + '/item/',
    GET_PRODUCT_DETAIL: '/pcm/api/' + version + '/product/'
};

exports.message = {
    errMsg1: 'Oops, we broke... sorry. Please try after sometime.',
    errMsg2: 'Sorry, we are not able to talk to Godam. Seems, Godam is broken.',
    errMsg3: 'Your credentials were correct, but we could not save your login. Sorry, try after some time.',
    errMsg4: 'Can not find User Profile data. Please contact your admin.',
    errMsg5: 'Username and password do not match! Please try again.',
    errMsg6: 'Oops! we are broken. Contact technical support.',
    errMsg7: 'You have not provided session key for logging out.',
    errMsg8: 'Session key sent is not in valid format. We accept only alphanumeric key atleast 10 characters long.',
    errMsg9: 'Your session could not be deleted. Sorry, try logout again after some time.',
    errMsg10: 'Failed to get Fulfillment Center. Please try again',
    errMsg11: 'Failed to get Client Name and Client SK. Please try again.',
    errMsg12: 'You need to provide session key to access this API.',
    errMsg13: 'You are not logged in. Please try after logging in.',
    errMsg14: 'Page not found.',
    errMsg15: 'Sorry, we are not able to talk to Coms. Seems, Coms is broken.',
    errMsg16: 'Waybill does not exist',
    errMsg17: 'Serviceability does not exist',


    succMsg1: 'You have been logged out.'
}
exports.CONSTANTS_VARS = {
    "CREATE_UNEXP_BATCH_SOURCE": "UE"
}

/*Google Autherization settings*/

exports.googleAuthConstant = {
    scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ],
    accessType: 'online'
}
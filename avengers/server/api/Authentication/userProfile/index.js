'use strict';

var express = require('express');
var controller = require('./userProfile.controller');

var middlewares = require('../../../middleware')

var router = express.Router();

router.use('/', middlewares.loginRequired);

router.get('/', controller.userprofile);

router.get('/getUserPermission', controller.getUserPermission);

module.exports = router;

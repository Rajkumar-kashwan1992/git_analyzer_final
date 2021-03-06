'use strict';

var express = require('express');
var controller = require('./detail.controller');
var middlewares = require('../../../middleware')

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.get('/', controller.getChnlDetail);

module.exports = router;
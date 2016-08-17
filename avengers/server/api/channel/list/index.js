'use strict';

var express = require('express');
var controller = require('./list.controller');
var middlewares = require('../../../middleware')

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.get('/', controller.getChannelList);

module.exports = router;
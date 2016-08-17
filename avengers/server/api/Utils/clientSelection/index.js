'use strict';

var express = require('express');
var controller = require('./clientSelection.controller');
var middlewares = require('../../../middleware')

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.get('/', controller.getClient);

module.exports = router;

'use strict';

var express = require('express');
var controller = require('./add.controller');
var middlewares = require('../../../middleware');

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.post('/', controller.addCourier);

module.exports = router;
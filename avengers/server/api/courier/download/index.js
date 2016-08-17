'use strict';

var express = require('express');
var controller = require('./download.controller');
var middlewares = require('../../../middleware');

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.get('/waybill/', controller.downloadWaybill);
router.get('/serviceability/', controller.downloadServiceability);

module.exports = router;
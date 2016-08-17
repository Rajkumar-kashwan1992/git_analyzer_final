'use strict';

var express = require('express');
var controller = require('./upload.controller');
var middlewares = require('../../../middleware');

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.post('/waybill/', controller.uploadWaybill);
router.post('/serviceability/', controller.uploadServiceability);

module.exports = router;
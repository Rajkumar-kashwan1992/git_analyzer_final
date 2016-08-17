'use strict';

var express = require('express');
var controller = require('./detail.controller');
var middlewares = require('../../../../middleware');

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.get('/prodDetail', controller.getProductDetail);
router.get('/pcmsDetail', controller.getPcmsProdDetail);

module.exports = router;
'use strict';

var express = require('express');
var controller = require('./list.controller');
var middlewares = require('../../../../middleware');

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.get('/', controller.getProductList);
router.get('/getProductInvList', controller.getProdInvList);
router.get('/downloadCsv', controller.downloadCSV);
router.put('/editProduct', controller.editProduct);

module.exports = router;
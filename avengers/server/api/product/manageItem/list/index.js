'use strict';

var express = require('express');
var controller = require('./list.controller');
var middlewares = require('../../../../middleware');

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.get('/', controller.getItemList);
router.get('/csvDownload', controller.downloadCSV);

module.exports = router;
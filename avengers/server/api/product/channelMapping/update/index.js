'use strict';

var express = require('express');
var controller = require('./update.controller');
var middlewares = require('../../../../middleware');

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.put('/', controller.updateProduct);

module.exports = router;
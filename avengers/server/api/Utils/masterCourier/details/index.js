'use strict';

var express = require('express');
var controller = require('./details.controller');
var middlewares = require('../../../../middleware');

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.get('/', controller.getPMCDetails);

module.exports = router;
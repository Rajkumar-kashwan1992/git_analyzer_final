'use strict';

var express = require('express');
var controller = require('./change.controller');
var middlewares = require('../../../../middleware')

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.post('/', controller.changePassword);

module.exports = router;

'use strict';

var express = require('express');
var controller = require('./modify.controller');
var middlewares = require('../../../middleware');

var router = express.Router();

router.use('/', middlewares.loginRequired);
router.get('/', controller.getCourierDetails);
router.post('/modify', controller.modifyCourierDetails);

module.exports = router;
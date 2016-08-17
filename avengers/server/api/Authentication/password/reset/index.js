'use strict';

var express = require('express');
var controller = require('./reset.controller');

var router = express.Router();

router.post('/', controller.resetPassword);
router.get('/validateToken', controller.validateToken);

module.exports = router;

'use strict';

var express = require('express');
var controller = require('./logout.controller');

var router = express.Router();

router.delete('/', controller.logout);

module.exports = router;

'use strict';

var express = require('express');
var controller = require('./verifySession.controller');

var router = express.Router();

router.head('/', controller.verifysession);

module.exports = router;

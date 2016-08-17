'use strict';

var express = require('express');
var controller = require('./home.controller');

var router = express.Router();

router.post('/', controller.logingid);
router.get('/callback', controller.successLogin);

module.exports = router;

var express = require('express');
var controller = require('./forgot.controller');

var router = express.Router();

router.post('/', controller.forgotPassword);

module.exports = router;

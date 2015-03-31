'use strict';

var express = require('express');
var controller = require('./roster.controller');
var router = express.Router();

module.exports = router;

router.get('/', controller.getRoster);

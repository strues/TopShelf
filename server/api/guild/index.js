'use strict';

var express = require('express');
var controller = require('./guild.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/realm', controller.show);

module.exports = router;

'use strict';

var express = require('express');
var controller = require('./recruitment.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.all);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;

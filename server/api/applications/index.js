'use strict';

var express    = require('express');
var controller = require('./application.controller');
var   config      = require('../../config/environment');
var auth       = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.put('/:application_id', auth.hasRole('admin'), controller.putApplication);
router.get('/:application_id', auth.hasRole('admin'), controller.getApplication);
router.post('/', controller.create);

module.exports = router;
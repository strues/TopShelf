'use strict';

var express = require('express');
var controller = require('./resource.controller');
var Resource = require('./resource.model');

var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.ensureAdmin, controller.create);
router.put('/:id', auth.ensureAdmin, controller.update);
router.patch('/:id', auth.ensureAdmin, controller.update);
router.delete('/:id', auth.ensureAdmin, controller.destroy);

module.exports = router;

'use strict';

var express = require('express');
var controller = require('./slide.controller');
var Slide = require('./slide.model');

var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.show);
router.post('/', auth.ensureAdmin, controller.create);
router.put('/:id', auth.ensureAdmin, controller.update);
router.delete('/:id', auth.ensureAdmin, controller.destroy);

module.exports = router;

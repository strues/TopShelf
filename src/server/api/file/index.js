'use strict';

var express = require('express');
var controller = require('./file.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.all);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', auth.ensureAdmin, controller.update);
router.patch('/:id', auth.ensureAdmin, controller.update);
router.delete('/:id', auth.ensureAdmin, controller.destroy);

module.exports = router;

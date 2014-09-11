'use strict';

var express    = require('express');
var controller = require('./roster.controller');
var config     = require('../../config/environment');
var auth       = require('../../authorization/authorization.service');


var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
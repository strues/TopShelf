'use strict';

var express    = require('express');
var controller = require('./application.controller');
var config     = require('../../config/environment');
var auth       = require('../../authorization/authorization.service');


var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
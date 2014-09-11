'use strict';

var express    = require('express');
var controller = require('./raid.controller');
var config     = require('../../config/environment');
var auth       = require('../../authorization/authorization.service');


var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
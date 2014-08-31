'use strict';

var express    = require('express');
var controller = require('./application.controller');
var config     = require('../../config/environment');


var router = express.Router();

router.get('/', controller.index);
router.delete('/:id', controller.destroy);
router.put('/:application_id',controller.putApplication);
router.get('/:application_id', controller.getApplication);
router.post('/',controller.create);

module.exports = router;
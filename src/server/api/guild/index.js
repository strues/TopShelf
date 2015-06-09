'use strict';

var express = require('express');
var controller = require('./guild.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Export the configured express router for the post api routes
module.exports = router;

router.get('/', controller.all);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

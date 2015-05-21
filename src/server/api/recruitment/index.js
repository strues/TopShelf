'use strict';

var express = require('express');
var controller = require('./recruitment.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Export the configured express router for the post api routes
module.exports = router;

// check if the used is authenticated at all

// check if the authenticated user has at least the 'admin' role
var isAdmin = auth.hasRole('admin');

router.get('/', controller.all);
router.get('/:id', controller.show);
router.post('/', isAdmin, controller.create);
router.delete('/:id', isAdmin, controller.destroy);

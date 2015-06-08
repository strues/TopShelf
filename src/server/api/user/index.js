'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

//router.get('/me', auth.isAuthenticated, controller.getMe);
router.put('/me', auth.isAuthenticated, controller.editMe);
router.get('/list', controller.list);
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

// Export the configured express router for the user api routes
module.exports = router;

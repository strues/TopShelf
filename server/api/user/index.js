'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/', controller.updateCurrentUser);
router.get('/:id', controller.getUserById);
router.put('/:id', auth.hasRole('admin'), controller.updateUser);
router.get('/', controller.checkEmailAvailable);

module.exports = router;


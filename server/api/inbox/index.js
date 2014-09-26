'use strict';

var express = require('express');
var controller = require('./inbox.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.post('/me/message', auth.isAuthenticated(), controller.message);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);

module.exports = router;
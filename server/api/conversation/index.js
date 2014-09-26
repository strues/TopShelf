'use strict';

var express = require('express');
var controller = require('./conversation.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',/* auth.hasRole('admin'),*/ controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/:id/public', controller.showPublic);
router.post('/:id/message', auth.isAuthenticated(), controller.addMessage);
router.put('/:id/message', auth.isAuthenticated(), controller.muteMessage);
router.post('/:id/ban', auth.isAuthenticated(), controller.addBan);
router.post('/:id/mod', auth.isAuthenticated(), controller.addMod);
router.put('/:id/ban', auth.isAuthenticated(), controller.removeBan);
router.put('/:id/mod', auth.isAuthenticated(), controller.removeMod);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
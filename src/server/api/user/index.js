'use strict';

var express    = require('express'),
    controller = require('./user.controller'),
    auth       = require('../../auth/auth.service'),
    router     = express.Router();

//router.get('/me', auth.isAuthenticated, controller.getMe);
router.put('/me', auth.isAuthenticated, controller.editMe);
router.get('/list', controller.list);
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id', auth.isAuthenticated(), auth.hasRole('admin'), controller.updateUser)

module.exports = router;

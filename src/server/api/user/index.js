'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var contextService = require('request-context');

var router = express.Router();

// Export the configured express router for the user api routes
module.exports = router;

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created request context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the used is authenticated at all
var isAuthenticated = auth.isAuthenticated();

// check if the authenticated user has at least the 'admin' role
var isAdmin = auth.hasRole('admin');

router.get('/', isAdmin, controller.index);
router.delete('/:id', isAdmin, controller.destroy);
router.get('/me', isAuthenticated, controller.me);
router.put('/:id/password', isAuthenticated, controller.changePassword);
router.put('/:id', isAuthenticated, controller.update);
router.get('/:id', controller.show);
router.post('/', controller.create);

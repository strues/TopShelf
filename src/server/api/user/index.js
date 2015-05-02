'use strict';

var express = require('express');
var UserController = require('./user.controller');
var auth = require('../../auth/auth.service');
var contextService = require('request-context');

var router = express.Router();

// Export the configured express router for the user api routes
module.exports = router;
/**
 * The api controller
 * @type {user:controller~UserController}
 */
var controller = new UserController(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created request context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the used is authenticated at all
var isAuthenticated = auth.isAuthenticated();

// check if the authenticated user has at least the 'admin' role
var isAdmin = auth.hasRole('admin');

// register user routes
router.route('/')
  .get(addRequestContext, isAuthenticated, addUserContext, controller.index)
  .post(addRequestContext, controller.create);

// fetch authenticated user info
router.route('/me')
  .get(addRequestContext, isAuthenticated, addUserContext, controller.me);

// user crud routes
router.route('/' + controller.paramString)
  .get(addRequestContext, isAuthenticated, addUserContext,
        isAdmin, controller.show)
  .delete(addRequestContext, isAuthenticated, addUserContext,
        isAdmin, controller.destroy)
  .put(addRequestContext, isAuthenticated, addUserContext,
        isAdmin, controller.update)
  .patch(addRequestContext, isAuthenticated, addUserContext,
        isAdmin, controller.update);

// set the password for a user
router.route('/' + controller.paramString +  '/password')
  .put(addRequestContext, isAuthenticated, addUserContext,
        controller.changePassword)
  .patch(addRequestContext, isAuthenticated, addUserContext,
        controller.changePassword);

// admin only - administrative tasks for a user resource (force set password)
router.route('/' + controller.paramString + '/admin')
  .put(addRequestContext, isAuthenticated, addUserContext,
        isAdmin, controller.setPassword)
  .patch(addRequestContext, isAuthenticated, addUserContext,
        isAdmin, controller.setPassword);

// Finish by binding the user middleware
router.param('userId', controller.userByID);

// Setting the facebook oauth routes
// app.route('/auth/facebook').get(passport.authenticate('facebook', {
//     scope: ['email']
// }));
// app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

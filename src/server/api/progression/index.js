/**
 * Module for handling application requests.
 * Initializing the [ApplicationController]{@link application:controller~ApplicationController}
 * and configuring the express router to handle the application api
 * for /api/applications routes. All Routes are registered after the
 * [request parameters]{@link application:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the application api routes
 * @module {express.Router} application
 * @requires {@link module:middleware}
 * @requires {@link application:controller~ApplicationController}
 */
'use strict';

var express = require('express');
var middleware = require('../../components/middleware');
var ProgressionController = require('./progression.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Export the configured express router for the user api routes
module.exports = router;

/**
 * The api controller
 * @type {application:controller~ApplicationController}
 */
var controller = new ProgressionController(router);

// check if the authenticated user has at least the 'admin' role
var isAdmin = auth.ensureAdmin;

// register application route parameters, uncomment if needed
// var registerApplicationParameters = require('./application.params');
// registerApplicationParameters(router);

// register application routes
router.route('/')
  .get(controller.index)
  .post(controller.create);

router.route('/' + controller.paramString)
  .get(controller.show)
  .delete(controller.destroy)
  .put(controller.update)
  .patch(controller.update);
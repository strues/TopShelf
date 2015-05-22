'use strict';
/**
 * Module for handling roster requests.
 * Initializing the [RosterController]{@link roster:controller~RosterController}
 * and configuring the express router to handle the application api
 * for /api/roster routes.
 * @module {express.Router} application
 * @requires {@link roster:controller~RosterController}
 */

var express = require('express');
var controller = require('./roster.controller');

var router = express.Router();

// register application routes
router.route('/')
  .get(controller.getRoster);

// Export the configured express router for the user api routes
module.exports = router;

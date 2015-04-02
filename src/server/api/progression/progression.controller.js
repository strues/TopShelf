/**
 * Module for the controller definition of the application api.
 * The ApplicationController is handling /api/applications requests.
 * @module {application:controller~ApplicationController} application:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = ProgressionController;

var ParamController = require('../../components/controllers/param.controller');

/**
 * The Application model instance
 * @type {application:model~Application}
 */
var Progression = require('./progression.model').model;

/**
 * ProgressionController constructor
 * @classdesc Controller that handles /api/applications route requests
 * for the application api.
 * Uses the 'id' parameter and the 'application' request property
 * to operate with the [main application API Model]{@link application:model~Application} model.
 * @constructor
 * @extends ParamController
 * @see application:model~Application
 */
function ProgressionController(router) {
  ParamController.call(this, Progression, 'progressionId', 'progressionDocument', router);
  this.defaultReturn = 'progressionDocument';
}

ProgressionController.prototype = Object.create(ParamController.prototype);
ProgressionController.prototype.constructor = ProgressionController;

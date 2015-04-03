/**
 * Module for the controller definition of the progression api.
 * The progressionController is handling /api/progression requests.
 * @module {progression:controller~progressionController} progression:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = ProgressionController;

var ParamController = require('../../components/controllers/param.controller');

/**
 * The progression model instance
 * @type {progression:model~progression}
 */
var Progression = require('./progression.model').model;

/**
 * ProgressionController constructor
 * @classdesc Controller that handles /api/progressions route requests
 * for the progression api.
 * Uses the 'id' parameter and the 'progression' request property
 * to operate with the [main progression API Model]{@link progression:model~progression} model.
 * @constructor
 * @extends ParamController
 * @see progression:model~progression
 */
function ProgressionController(router) {
    ParamController.call(this, Progression, 'progressionId', 'progressionDocument', router);
    this.defaultReturn = 'progressionDocument';
}

ProgressionController.prototype = Object.create(ParamController.prototype);
ProgressionController.prototype.constructor = ProgressionController;

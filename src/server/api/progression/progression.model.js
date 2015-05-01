/**
 * An module for defining and initializing the Application model.
 * Exporting the Application model definition, schema and model instance.
 * @module {Object} application:model
 * @property {Object} definition - The [definition object]{@link application:model~ApplicationDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link application:model~ApplicationSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link application:model~Application}
 */
'use strict';

var mongoose = require('mongoose');

/**
 * The Application model definition
 * @type {Object}
 * @property {String} name - The name of this application
 * @property {String} info - Details about this application
 * @property {Boolean} active - Flag indicating this application is active
 */
var ProgressionDefinition = {
  bossName: String,
  dead: Boolean,
  zone: String,
  killDate: {
      type: Date
    }
};

/**
 * The Application model schema
 * @type {MongooseSchema}
 */
var ProgressionSchema = new mongoose.Schema(ProgressionDefinition);
/**
 * Virtual 'profile'
 * Public profile information
 * @memberOf UserSchema
 */
ProgressionSchema
  .virtual('progressionDetail')
  .get(getProgressionDetail);

/**
 * Validations
 */
ProgressionSchema
  .path('bossName')
  .validate(validateUniqueName, 'The specified name is already in use.');

/**
 *  The registered mongoose model instance of the Application model
 *  @type {Application}
 */
var Progression = mongoose.model('Progression', ProgressionSchema);

/**
 * Validate the uniqueness of the given name
 *
 * @api private
 * @param {String} value - The username to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueName(value, respond) {
  // jshint validthis: true
  var self = this;

  // check for uniqueness of user name
  this.constructor.findOne({bossName: value}, function (err, progression) {
    if (err) {
      throw err;
    }

    if (progression) {
      // the searched name is my name or a duplicate
      return respond(self.id === progression.id);
    }

    respond(true);
  });
}

/**
 * Return the value of the virtual profile property
 *
 * @api private
 * @returns {{_id: *, name: *, prename: *, surname: *, email: *, active: *, role: *, info: *}}
 */
function getProgressionDetail() {
  // jshint validthis: true
  return {
    '_id': this._id,
    'bossName': this.bossName,
    'dead': this.dead,
    'zone': this.zone
  };
}

module.exports = {

  /**
   * The Application model definition object
   * @type {Object}
   * @see application:ApplicationModel~ProgressionDefinition
   */
  definition: ProgressionDefinition,

  /**
   * The Application model schema
   * @type {MongooseSchema}
   * @see application:model~ApplicationSchema
   */
  schema: ProgressionSchema,

  /**
   * The Application model instance
   * @type {application:model~Application}
   */
  model: Progression

};

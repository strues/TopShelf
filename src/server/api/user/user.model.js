/**
 * An module for defining and initializing the User model.
 * Exporting the User model definition, schema and model instance.
 * @module {Object} user:model
 * @property {Object} definition - The [definition object]{@link user:model~UserDefinition}
 * @property {Schema} schema - The [mongoose model schema]{@link user:model~UserSchema}
 * @property {Model} model - The [mongoose model]{@link user:model~User}
 */
'use strict';

var mongoose = require('mongoose');
var MongooseError = require('mongoose/lib/error');
var crypto = require('crypto');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified')
  .createdModifiedPlugin;

var Schema = mongoose.Schema;

var UserDefinition = {
  username: {
    type: String,
    trim: true,
    default: ''
  },
  firstName: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  articles: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  application: {
    type: Schema.Types.ObjectId,
    ref: 'Application'
  },
  characters: {
    type: Schema.Types.ObjectId,
    ref: 'Character'
  },
  twitch: {
    type: String,
    trim: true,
    default: ''
  },
  battletag:{
    type: String,
    trim: true,
    default: ''
  },
  hashedPassword:{
    type: String
  },
  salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user']
  },
  role:{
    type: String,
    default: ''
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
};

/**
 * The User model schema
 * @type {Schema}
 */
var UserSchema = new Schema(UserDefinition);

/**
 * Virtual 'password'
 * Used for getting and setting the internal hashedPassword property
 * @memberOf UserSchema
 */
UserSchema
  .virtual('password')
  .set(setPassword)
  .get(getPassword);

/**
 * Virtual 'profile'
 * Public profile information
 * @memberOf UserSchema
 */
UserSchema
  .virtual('profile')
  .get(getProfile);

/**
 * Virtual 'token'
 * Non-sensitive info we'll be putting in the token
 * @memberOf UserSchema
 */
UserSchema
  .virtual('token')
  .get(getToken);

/**
 * Validations
 */

// Validate username is not taken
UserSchema
  .path('email')
  .validate(validateUniqueEmail,
    'The specified email address is already in use.');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(validateHashedPassword, 'Password cannot be blank');

/**
 * Attach pre hook plugins
 */
UserSchema.plugin(requestContext, {
  propertyName: 'modifiedBy',
  contextPath: 'request:acl.user.name'
});
/**
 * Authenticate - check if the password is correct
 *
 * @param {String} plainText
 * @return {Boolean}
 * @api public
 */
UserSchema.methods.authenticate = function authenticate(plainText) {
  return this.encryptPassword(plainText) === this.hashedPassword;
};

/**
 * Make salt
 *
 * @return {String}
 * @api public
 */
UserSchema.methods.makeSalt = function makeSalt() {
  return crypto.randomBytes(16).toString('base64');
};

/**
 * Encrypt password
 *
 * @param {String} password
 * @return {String}
 * @api public
 */
UserSchema.methods.encryptPassword = function encryptPassword(password) {
  if (!password || !this.salt) {
    return '';
  }

  var salt = new Buffer(this.salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
};

/**
 * Attach post hook plugins
 */
UserSchema.plugin(createdModifiedPlugin);

/**
 * Set the virtual password property
 *
 * @api private
 * @param {String} password - The user password to set
 */
function setPassword(password) {
  // jshint validthis: true
  this._password = password;
  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
}

/**
 * Get the value of the virtual password property
 *
 * @api private
 * @returns {String|*} The value of the virtual password property
 */
function getPassword() {
  // jshint validthis: true
  return this._password;
}

/**
 * Return the value of the virtual profile property
 *
 * @api private
 * @returns {{_id: *, username: *, firstName: *, role: *, battletag: *, twitch: *, info: *}}
 */
function getProfile() {
  // jshint validthis: true
  return {
    '_id': this._id,
    'username': this.username,
    'firstName': this.firstName,
    'role': this.role,
    'battletag': this.battletag,
    'twitch': this.twitch,
    'info': this.info
  };
}
/**
 * Return the value of the virtual token property
 *
 * @api private
 * @returns {{_id: *, username: *, role: *}}
 */
function getToken() {
  // jshint validthis: true
  return {
    '_id': this._id,
    'username': this.username,
    'role': this.role
  };
}
/**
 * Check if the hashed password is specified.
 *
 * @api private
 * @param {String} hashedPassword
 * @returns {Boolean} True if the hashed password has a length
 */
function validateHashedPassword(hashedPassword) {
  return hashedPassword.length;
}

/**
 * Check existence and length of the given value.
 *
 * @api private
 * @param {String} value - The value to check
 * @returns {Boolean} True if a value with a truthy length property is given
 */
function validatePresenceOf(value) {
  return value && value.length;
}

/**
 * Validate the uniqueness of the given email
 *
 * @api private
 * @param {String} value - The email to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueEmail(value, respond) {
  // jshint validthis: true
  var self = this;

  // check for uniqueness of user email
  this.constructor.findOne({email: value}, function (err, user) {
    if (err) {
      throw err;
    }

    if (user) {
      // the searched email is my email or a duplicate
      return respond(self.id === user.id);
    }

    respond(true);
  });
}

/**
 * Find possible not used username
 *
 * @api private
 */
function findUniqueUsername(username, suffix, callback) {
  // jshint validthis: true
  var self = this;
  var possibleUsername = username + (suffix || '');

  this.findOne({
    username: possibleUsername
  }, function(err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return this.findUniqueUsername(username,
          (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
}

/**
 * Pre save hook for the User model. Validates the existence of the
 * hashedPassword property if the document is saved for the first time.
 * Ensure that only the root user can update itself.
 *
 * @api private
 * @param {Function} next - The mongoose middleware callback
 * @returns {*} If an error occurs the passed callback with an Error as its argument is called
 */
function preSave(next) {
  // jshint validthis: true
  var self = this;

  if (this.isNew && !validatePresenceOf(this.hashedPassword)) {
    return next(new MongooseError.ValidationError('Missing password'));
  }
}

module.exports = {

  /**
   * The User model definition object
   * @type {Object}
   * @see user:UserModel~UserDefinition
   */
  definition: UserDefinition,

  /**
   * The User model schema
   * @type {Schema}
   * @see user:model~UserSchema
   */
  schema: UserSchema,

  /**
   *  The registered mongoose model instance of the User model
   *  @type {User}
   */
  model: mongoose.model('User', UserSchema)
};

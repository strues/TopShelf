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
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    select: false
  },
  displayName: String,
  username: String,
  picture: String,
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  isAdmin: Boolean,
  facebook: String,
  battlenet: String,
  xenforo: String,
  google: String,
  twitter: String,
  providers: [],
  resetPasswordToken: String,
  resetPasswordTokenExpiration: Date,
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
  articles: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  }
});

/**
 * Virtual 'token'
 * Non-sensitive info we'll be putting in the token
 * @memberOf userSchema
 */

userSchema
  .virtual('token')
  .get(getToken);

/**
 * Return the value of the virtual token property
 *
 * @api private
 * @returns {{_id: *, role: *}}
 */
function getToken() {
  // jshint validthis: true
  return {
    '_id': this._id,
    'isAdmin': this.isAdmin
  };
}

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

userSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    options.select = options.select || 'displayName battletag';
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  }
}

module.exports = mongoose.model('User', userSchema);

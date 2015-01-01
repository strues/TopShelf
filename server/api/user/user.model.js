'use strict';

var mongoose = require('mongoose');

var crypto = require('crypto');
var _ = require('lodash');
var authTypes = ['bnet', 'twitter', 'facebook'];

var UserSchema = new mongoose.Schema({
  name: {type: String, unique: true, index: true},
  email: {type: String, unique: true, index: true},
  role: {type: String, default : 'user', enum: ['admin', 'user']},
  password: String,
  provider: String,
  salt: String,
  facebook: {type: String, unique: true, sparse: true},
  twitter: {type: String, unique: true, sparse: true},
  bnet: {type: String, unique: true, sparse: true},
  tokens: Array,
  profileDetails: {
    firstName: {type: String, default: ''},
    gender: {type: String, default: ''},
    location: {type: String, default: ''},
    website: {type: String, default: ''},
    picture: {type: String, default: ''},
    battletag: {type: String, default: ''}
 },
  characterDetails: {
      lastModified: {type: Number, default: ''},
      name: {type: String, default: ''},
      realm: {type: String, default: ''},
      battlegroup: {type: String, default: ''},
      class: {type: Number, default: ''},
      race: {type: Number, default: ''},
      gender: {type: Number, default: ''},
      level: {type: Number, default: ''},
      achievementPoints: {type: Number, default: ''},
      thumbnail: {type: String, default: ''},
      calcClass: {type: Number, default: ''},
 },
  activity: {
    date_created: {type: Date, default: Date.now},
    last_logon: {type: Date, default: Date.now},
    last_updated: {type: Date},
 }
});

/**
 * Virtuals
 */

// Public profile information
UserSchema.virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
   };
 });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
   };
 });

/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
 }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('password')
  .validate(function(password) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return password.length;
 }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
     }
      respond(true);
   });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function(next) {
    // Handle new/update passwords
    if (this.password) {
      if (!validatePresenceOf(this.password) && authTypes.indexOf(this.provider) === -1)
        next(new Error('Invalid password'));

      // Make salt with a callback
      var _this = this;
      this.makeSalt(function(saltErr, salt) {
        if (saltErr) next(saltErr);
        _this.salt = salt;
        // Async hash
        _this.encryptPassword(_this.password, function(encryptErr, hashedPassword) {
          if (encryptErr) next(encryptErr);
          _this.password = hashedPassword;
          next();
       });
     });
   } else {
      next();
   }
 });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @callback {callback} Optional callback
   * @return {Boolean}
   * @api public
   */
  authenticate: function(password, callback) {
    if (!callback)
      return this.password === this.encryptPassword(password);

    var _this = this;
    this.encryptPassword(password, function(err, pwdGen) {
      if (err) callback(err);

      if (_this.password === pwdGen) {
        callback(null, true);
     } else {
        callback(null, false);
     }
   });
 },

  /**
   * Make salt
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @callback {callback} Optional callback
   * @return {String}
   * @api public
   */
  makeSalt: function(byteSize, callback) {
    var defaultByteSize = 16;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
   } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
   }

    if (!byteSize) {
      byteSize = defaultByteSize;
   }

    if (!callback) {
      return crypto.randomBytes(byteSize).toString('base64');
   }

    return crypto.randomBytes(byteSize, function(err, salt) {
      if (err) callback(err);
      return callback(null, salt.toString('base64'));
   });
 },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @callback {callback} Optional callback
   * @return {String}
   * @api public
   */
  encryptPassword: function(password, callback) {
    if (!password || !this.salt) {
      return null;
   }

    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');

    if (!callback)
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength).toString('base64');

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, function(err, key) {
      if (err) callback(err);
      return callback(null, key.toString('base64'));
   });
 }
};

module.exports = mongoose.model('User', UserSchema);

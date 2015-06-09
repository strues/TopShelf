'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  authTypes = ['bnet', 'twitter', 'facebook', 'google'];

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    default: 'user'
  },
  enabled: {
    type: Boolean,
    default: true
  },
  hashedPassword: String,
  salt: String,
  provider: String,
  providers: {
    type: Object,
    default: {
      local: false,
      facebook: false,
      twitter: false,
      google: false
    }
  },

  facebook: {},
  twitter: {},
  google: {},
  resetPasswordToken: String,
  resetPasswordTokenExpiration: Date,
  // References to other collections
  articles: {
    type: Schema.Types.ObjectId,
    ref: 'Article'
  },
  // Battlenet
  bnetId: Number,
  battletag: String,
  // characters
  characters: [{
    name: String,
    realm: String,
    battlegroup: String,
    class: Number,
    race: Number,
    gender: Number,
    level: Number,
    achievementPoints: Number,
    thumbnail: String
  }],
  mainCharacter: {
    name: String,
    realm: String,
    thumb: String,
    classNum: Number
  }
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      '_id': this._id,
      'username': this.username,
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
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({
      email: value
    }, function(err, user) {
      if (err) {
        throw err;
      }
      if (user) {
        if (self.id === user.id) {
          return respond(true);
        }
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
    if (!this.isNew) {
      return next();
    }
    if (!validatePresenceOf(this.hashedPassword) &&
      authTypes.indexOf(this.provider) ===
      -1) {
      next(new Error('Invalid password'));
    }
    else {
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
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) {
      return '';
    }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

module.exports = mongoose.model('User', UserSchema);

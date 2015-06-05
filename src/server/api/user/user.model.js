'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var userSchema = new mongoose.Schema({
  email: {
    validate:[validateEmail, 'not valid'],
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    select: false,
    min: 5,
    max: 20,
    trim: true
  },
  displayName: {
    type: String
  },
  picture: String,
  role: {
    type: String,
    default: 'User'
  },
  twitch: {
    type: String,
    trim: true,
    default: ''
  },
  battletag: {
    type: String
  },
  isAdmin: Boolean,
  providers: {},
  facebook: String,
  battlenet: String,
  xenforo: String,
  google: String,
  twitter: String,
  resetPasswordToken: String,
  resetPasswordTokenExpiration: Date,
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

userSchema.statics = {
  /**
   *  Find User By username
   *  @param {String}
   *  @param {Function}
   */
  findByUsername: function(name, cb) {
    this.findOne({
      displayName: name
    }).exec(cb);
  }
};

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

module.exports = mongoose.model('User', userSchema);

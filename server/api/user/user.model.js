'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var UserSchema = new Schema({
  username: String,
  name: String,
  email: { type: String, lowercase: true },
  role: {
    type: String,
    default: 'user'
  },
  hashedPassword: String,
  provider: String,
  salt: String,
  google: {},
  github: {},
  online: {type: Boolean, default: false, index: true},
  socketID: {type: String, index: true},
  friendlist: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  friendrequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  pendingfriendrequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  conversations:[{type: Schema.Types.ObjectId, ref:'Conversation'}]
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
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return hashedPassword.length;
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
  .pre('save', function (next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
      next(new Error('Invalid password'));
    else
      next();
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
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  },

  isFriend: function (userID){
    var isFriend = false;

    this.friendlist.forEach(function (friendID){
      if(friendID.equals(userID)) isFriend = true;
    })

    return isFriend;
  },

  haveRequest: function (userID){
    var haveRequest = false;

    this.friendrequests.forEach(function (reqID){
      if(reqID.equals(userID)) haveRequest = true;
    })

    return haveRequest;
  },

  havePendingRequest: function (userID){
    var havePendingRequest = false;

    this.pendingfriendrequests.forEach(function (pendingID){
      if(pendingID.equals(userID)) havePendingRequest = true;
    })

    return havePendingRequest;
  },

  addFriend: function(userID, save){

    if(!this.isFriend(userID)) this.friendlist.push(userID);

    if(save){
      this.save(function (err){
        if(err) console.log('User.c.addFriend > ERROR: ', err);
      })
    }
  },

  removeFriend: function(userID, save){
    var self = this,
        madeChange = false;

    this.friendlist.forEach(function (friendID, index){
      if(friendID.equals(userID)) {
        self.friendlist.splice(index, 1);
        madeChange = true;
      }
    })

    if(madeChange && save){
      this.save(function (err){
        if(err) console.log('User.c.removeFriend > ERROR: ', err);
      });
    }
  },

  addFriendRequest: function(userID, save){

    if(!this.isFriend(userID) && !this.haveRequest(userID)) this.friendrequests.push(userID);

    if(save){
      this.save(function (err){
        if(err) console.log('User.c.addFriendRequest > ERROR: ', err);
      })
    }
  },

  removeFriendRequest: function(userID, save){
    var self = this,
        madeChange  = false;

    this.friendrequests.forEach(function (reqID, index){
      if(reqID.equals(userID)) {
        self.friendrequests.splice(index, 1);
        madeChange = true;
      }
    })

    if(madeChange && save){
      this.save(function (err){
        if(err) console.log('User.c.removeFriendRequest > ERROR: ', err);
      });
    }
  },

  addPendingFriendRequest: function (userID, save){

    if(!this.havePendingRequest(userID)) this.pendingfriendrequests.push(userID);

    if(save){
      this.save(function (err){
        if(err) console.log('User.c.addPendingFriendRequest > ERROR: ', err);
      });
    }
  },

  removePendingFriendRequest: function (userID, save){
    var self = this;

    this.pendingfriendrequests.forEach(function (pendingID, index){
      if(pendingID.equals(userID)) self.pendingfriendrequests.splice(index, 1);
    })

    if(save){
      this.save(function (err){
        if(err) console.log('User.c.removePendingFriendRequest > ERROR: ', err);
      });
    }
  },

  getConversation: function (friendID){
    var friendConversation;

    this.conversations.forEach(function (conversation){
      conversation.participants.forEach(function (part){
        if(part.equals(friendID)) friendConversation = conversation;
      })
    })

    return friendConversation;
  }
};

/*
  Statics
*/

UserSchema.statics = {
  getOnlineUsers: function (callback){
    var User = this || mongoose.model('User');

    return User
            .model('User')
            .find({online: true},'-hashedPassword -salt', callback);
  },

  getFriendList: function (userID, callback){
    var User = this || mongoose.model('User');

    return User
            .model('User')
            .find({_id: userID}, 'friendlist')
            .exec(callback);
  },

  getFriendRequests: function (userID, callback){
    var User = this || mongoose.model('User');

    return User
            .model('User')
            .find({_id: userID}, 'friendrequests')
            .exec(callback);
  },

  getPendingFriendRequests: function (userID, callback){
    var User = this || mongoose.model('User');

    return User
            .model('User')
            .find({_id: userID}, 'pendingfriendrequests')
            .exec(callback);
  },

  getFriendCollection: function (userID, callback){
    var User = this || mongoose.model('User');

    return User
            .model('User')
            .find({_id: userID}, 'friendrequests friendlist pendingfriendrequests')
            .exec(callback);
  }
}

module.exports = mongoose.model('User', UserSchema);

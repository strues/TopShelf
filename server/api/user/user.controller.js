'use strict';

var User = require('./user.model');
var Conversation = require('../conversation/conversation.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User
    .find({}, '-hashedPassword -salt')
    .exec(function (err, users) {
      if(err) return res.send(500, err);
      res.json(200, users);
    });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User
    .findById(userId, '-hashedPassword -salt')
    .populate('friendlist', 'name online')
    .populate('friendrequests', 'name')
    .populate('pendingfriendrequests', 'name')
    .populate('conversations')
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(401);
      res.json(user);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User
    .findOne({_id: userId}, '-salt -hashedPassword')
    .populate('friendlist', 'name online')
    .populate('friendrequests', 'name')
    .populate('pendingfriendrequests', 'name')
    .populate('conversations')
    .exec(function(err, user) { // don't ever give out the password or salt
      if (err) return next(err);
      if (!user) return res.send(401);
      res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.getMyFriendIndex = function (req, res, next){
  var userID = req.user._id;

  User.getFriendList(userID, function (err, user){
    if(err) return next(err);
    if(!user) return res.send(401);
    res.json(user.friendlist);
  });
}

exports.getFriendIndex = function (req, res, next){
  var userID    = req.user._id,
      targetID  = req.params.id;

  if(userID !== targetID && req.user.role !== 'admin') res.send(403);

  User.getFriendList(userID, function (err, user){
    if(err) return next(err);
    if(!user) return res.send(401);
    res.json(user.friendlist);
  });
}

exports.getMyFriendRequests = function (req){
  var userID = req.user._id;

  User.getFriendRequests(userID, function (req, res, err, user, next){
    if(err) return next(err);
    if(!user) return res.send(401);
    res.json(user.friendrequests);
  });
}

exports.getFriendRequests = function (req, res, next){
  var userID    = req.user._id,
      targetID  = req.params.id;

  if(userID !== targetID && req.user.role !== 'admin') res.send(403);

  User.getFriendRequests(targetID, function (err, user){
    if(err) return next(err);
    if(!user) return res.send(401);
    res.json(user.friendrequests);
  });
}

exports.putFriendRequest = function (req, res, next){
  var userID      = req.user._id,
      targetMail  = req.body.email;

  User.findOne({email: targetMail}, '_id', function (err, userCheck){
    if(err) return next(err);
    if(!userCheck) return res.send(401);

    if(userCheck._id.equals(userID)) res.send(403);

    User.findById(userCheck._id, function (err, user){
      user.addFriendRequest(userID, true)
      res.send(200);
    })
  })
}

exports.removeMyFriend = function (req, res, next){
  var userID    = req.user._id,
      friendID  = req.params.friendID;

  if(userID === friendID) res.send(403);

  User.findById(userID, function (err, user){
    if(err) return next(err);
    if(!user) return res.send(401);

    user.removeFriend(friendID, true);

    User.findById(friendID, function (innererr, inneruser){
      if(innererr) return next(err);
      if(!inneruser) return res.send(401);

      inneruser.removeFriend(userID, true);
      res.send(200);
    })
  })
}

exports.removeMyFriendRequest = function (req, res, next){
  var userID    = req.user._id,
      targetID  = req.params.id;

  if(userID === targetID) res.send(403);

  User.getFriendRequests(targetID, function (err, user){
    user.removeFriendRequest(userID, true)
    res.send(200);
  })
}

exports.acceptFriendRequest = function (req, res, next){
  var userID    = req.user._id,
      requestID = req.body.requestID;

  User.findById(userID, function (err, user){
    if(err) return next(err);
    if(!user) return res.send(401);

    user.removeFriendRequest(requestID);
    user.addFriend(requestID);

    var con = {
      publicConversation: false,
      participants: [userID, requestID],
      messages: []
    }

    Conversation.create(con, function (error, created){
      if(error) next(error);
      if(!created) return res.send(500);

      User.findById(userID, function (erru, useru){
        if(erru) next(erru);
        if(!useru) return res.send(401);

        useru.conversations.push(created._id);
        useru.save();
      })

      User.findById(requestID, function (errf, userf){
        if(errf) next(errf);
        if(!userf) return res.send(401);

        userf.conversations.push(created._id);
        userf.save();
      })
    })

    User.findById(requestID, function (innererr, inneruser){
      if(innererr) return next(innererr);
      if(!inneruser) return res.send(401);

      inneruser.removePendingFriendRequest(userID);
      inneruser.addFriend(userID);

      user.save(function (err){
        if(err) next(err);
        inneruser.save(function (err){
          if(err) next(err);
          res.send(200);
        })
      })
    })
  })
}

exports.rejectFriendRequest = function (req, res, next){
  var userID    = req.user._id,
      requestID = req.body.requestID;

  User.findById(userID, function (err, user){
    if(err) return next(err);
    if(!user) return res.send(401);

    user.removeFriendRequest(requestID, true);

    User.findById(requestID, function (innererr, inneruser){
      if(innererr) return next(innererr);
      if(!inneruser) return res.send(401);

      inneruser.removePendingFriendRequest(userID, true);
      res.send(200);
    })
  })
}

exports.messageFriend = function (req, res, next){
  var userID    = req.user._id,
      friendID  = req.params.friendID,
      message   = req.body.message;

  this
    .findById(userID)
    .populate('conversations')
    .exec(function (err, user){
      if(err) return next(err);
      if(!user) return res.send(401);
      if(!this.isFriend(friendID)) res.send(403);

      var friendConversation = user.getConversation(friendID);

      if(friendConversation){
        friendConversation.addMessage(userID, message);
      } else {
        var con = {
          publicConversation: false,
          participants: [userID, friendID],
          messages: []
        }

        Conversation.create(con, function (error, created){
          if(error) next(error);
          if(!created) return res.send(500);

          created.addMessage(userID, message);

          User.findById(userID, function (erru, useru){
            if(erru) next(erru);
            if(!useru) return res.send(401);

            useru.conversations.push(created._id);
            useru.save();
          })

          User.findById(friendID, function (errf, userf){
            if(errf) next(errf);
            if(!userf) return res.send(401);

            userf.conversations.push(created._id);
            userf.save();
          })
        })
      }
    })  
} 
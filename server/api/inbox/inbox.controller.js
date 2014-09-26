'use strict';

var _ = require('lodash');
var Inbox = require('./inbox.model');
var User  = require('../user/user.model');

// Get list of inboxs
exports.index = function(req, res) {
  Inbox.find(function (err, inboxs) {
    if(err) { return handleError(res, err); }
    return res.json(200, inboxs);
  });
};

// Get a single inbox
exports.show = function(req, res) {
  Inbox.findById(req.params.id, function (err, inbox) {
    if(err) { return handleError(res, err); }
    if(!inbox) { return res.send(404); }
    return res.json(inbox);
  });
};

// Creates a new inbox in the DB.
exports.create = function(req, res) {
  Inbox.create(req.body, function(err, inbox) {
    if(err) { return handleError(res, err); }
    return res.json(201, inbox);
  });
};

// Updates an existing inbox in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Inbox.findById(req.params.id, function (err, inbox) {
    if (err) { return handleError(res, err); }
    if(!inbox) { return res.send(404); }
    var updated = _.merge(inbox, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, inbox);
    });
  });
};

// Deletes a inbox from the DB.
exports.destroy = function(req, res) {
  Inbox.findById(req.params.id, function (err, inbox) {
    if(err) { return handleError(res, err); }
    if(!inbox) { return res.send(404); }
    inbox.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userID = req.user._id;
  
  Inbox
    .findOne({owner: userID})
    .populate('box.sender', 'name')
    .exec(function (err, inbox) {
      if (err) return next(err);
      if (!inbox) return res.json(401);
      res.json(inbox);
    });
};

/*
  Message user on friendlist
*/
exports.message = function (req, res, next){
  var userID      = req.user._id,
      recipientID = req.body.recipientID,
      message     = req.body.message;

  /*
    > Recipient exists
    t
      > user on recipient friend list?
        > update message
      > error
    f
      > error
  */

  User.findOne({_id: recipientID}, 'friendlist', function (err, recipient){
    if(err) {
      res.send(500);
      console.log('Inbox > failed to send message ERROR: ', err);
    }
    if(!recipient) {
      res.send(410);
      return false;
    }

    if(recipient.isFriend(userID)) {
      Inbox.findOne({owner: recipientID}, function (err, inbox){
        if(err) {
          res.send(500);
          console.log('Inbox > can\'t find inbox with owner: ', recipientID, ' ERROR: ', err);
        }
        if(!inbox) {
          res.send(410);
          return false;
        }

        inbox.addMessage(recipientID, userID, message);
        res.send(200);
      })
    } else {
      res.send(403);
    }
  })
}

function handleError(res, err) {
  return res.send(500, err);
}
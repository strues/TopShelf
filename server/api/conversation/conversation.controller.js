'use strict';

var _ = require('lodash');
var Conversation = require('./conversation.model');
var Auth = require('../../auth/auth.service');

// Get list of conversations
exports.index = function(req, res) {
  Conversation.find(function (err, conversations) {
    if(err) { return handleError(res, err); }
    return res.json(200, conversations);
  });
};

// Get a single conversation
exports.show = function(req, res) {
  Conversation.findOneAndPopulate(req.params.id, function (err, conversation) {
    if(err) { return handleError(res, err); }
    if(!conversation) { return res.send(404); }

    if(req.user && conversation.maySee(req.user._id)) 
      return res.json(conversation);
    else
      return res.send(403);
  });
};

exports.showPublic = function(req, res){
  Conversation.findOneAndPopulate(req.params.id, function (err, conversation) {
    if(err) { return handleError(res, err); }
    if(!conversation) { return res.send(404); }

    if(conversation.isPublic()) 
      res.json(conversation);
    else
      res.send(403);
  });  
}

// Creates a new conversation in the DB.
exports.create = function(req, res) {
  Conversation.create(req.body, function (err, conversation) {
    if(err) { return handleError(res, err); }
    return res.json(201, conversation);
  });
};

// Updates an existing conversation in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Conversation.findOneBySharedId(req.params.id, function (err, conversation) {
    if (err) { return handleError(res, err); }
    if(!conversation) { return res.send(404); }
    var updated = _.merge(conversation, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, conversation);
    });
  });
};

// Deletes a conversation from the DB.
exports.destroy = function(req, res) {
  Conversation.findOneBySharedId(req.params.id, function (err, conversation) {
    if(err) { return handleError(res, err); }
    if(!conversation) { return res.send(404); }
    conversation.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.addMessage = function (req, res){
  var userID          = req.user._id,
      conversationID  = req.params.id,
      message         = req.body.message;

  if(!message) handleError(res, 'Conversation.c.addMessage > Paramater message not found on req.body.');

  Conversation.findOneBySharedId(conversationID, function (err, con){
    if(err) handleError(res, 'Conversation.c.addMessage > ERROR: ', err);
    if(con) {
      con.addMessage(userID, message);
      res.send(200);
    }
  })
}

exports.muteMessage = function (req, res){
  var userID          = req.user._id,
      conversationID  = req.params.id,
      messageID       = req.body.messageID;

  if(!messageID) handleError(res, 'Conversation.c.muteMessage > Paramater messageID not found on req.body.');

  Conversation.findOneBySharedId(conversationID, function (err, con){
    if(err) handleError(res, 'Conversation.c.addMessage > ERROR: ', err);
    if(con) {
      con.muteMessage(userID, messageID);
      res.send(200);
    }
  })
}

exports.addMod = function (req, res){
  var userID          = req.user._id,
      conversationID  = req.params.id,
      moderatorID     = req.body.moderatorID;

  if(!moderatorID) handleError(res, 'Conversation.c.addMod > Paramater moderatorID not found on req.body.');

  Conversation.findOneBySharedId(conversationID, function (err, con){
    if(err) handleError(res, 'Conversation.c.addMod > ERROR: ', err);
    if(con) {
      con.addModerator(userID, moderatorID);
      res.send(200);
    }
  })
}

exports.removeMod = function (req, res){
    var userID        = req.user._id,
      conversationID  = req.params.id,
      moderatorID     = req.body.moderatorID;

  if(!moderatorID) handleError(res, 'Conversation.c.removeMod > Paramater moderatorID not found on req.body.');

  Conversation.findOneBySharedId(conversationID, function (err, con){
    if(err) handleError(res, 'Conversation.c.addMod > ERROR: ', err);
    if(con) {
      con.removeModerator(userID, moderatorID);
      res.send(200);
    }
  })
}

exports.addBan = function (req, res){
  var userID          = req.user._id,
      conversationID  = req.params.id,
      banID           = req.body.banID,
      reason          = req.body.reason || '';

  if(!banID) handleError(res, 'Conversation.c.addBan > Paramater banID not found on req.body.');

  Conversation.findOneBySharedId(conversationID, function (err, con){
    if(err) handleError(res, 'Conversation.c.addBan > ERROR: ', err);
    if(con) {
      con.addBan(userID, banID);
      res.send(200);
    }
  })
}

exports.removeBan = function (req, res){
  var userID        = req.user._id,
      conversationID  = req.params.id,
      banID           = req.body.banID;

  if(!banID) handleError(res, 'Conversation.c.removeBan > Paramater banID not found on req.body.');

  Conversation.findOneBySharedId(conversationID, function (err, con){
    if(err) handleError(res, 'Conversation.c.removeBan > ERROR: ', err);
    if(con) {
      con.removeBan(userID, banID);
      res.send(200);
    }
  })
}

function handleError(res, msg, err) {
  console.log(msg, err);
  return res.send(500, err);
}
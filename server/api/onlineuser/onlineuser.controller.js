'use strict';

var _ = require('lodash');
var Onlineuser = require('./onlineuser.model');

// Get list of onlineusers
exports.index = function(req, res) {
  /*Onlineuser.find(function (err, onlineusers) {
    if(err) { return handleError(res, err); }
    return res.json(200, onlineusers);
  });*/

  Onlineuser
    .find({}, {_id:0})
    .populate('userID', 'name email')
    .exec(function (err, onlineusers) {
      if(err) { return handleError(res, err); }
      return res.json(200, onlineusers);
    });
};

// Get a single onlineuser
exports.show = function(req, res) {
  Onlineuser.findById(req.params.id, function (err, onlineuser) {
    if(err) { return handleError(res, err); }
    if(!onlineuser) { return res.send(404); }
    return res.json(onlineuser);
  });
};

// Creates a new onlineuser in the DB.
exports.create = function(req, res) {
  Onlineuser.create(req.body, function (err, onlineuser) {
    if(err) { return handleError(res, err); }
    return res.json(201, onlineuser);
  });
};

// Updates an existing onlineuser in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Onlineuser.findById(req.params.id, function (err, onlineuser) {
    if (err) { return handleError(res, err); }
    if(!onlineuser) { return res.send(404); }
    var updated = _.merge(onlineuser, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, onlineuser);
    });
  });
};

// Deletes a onlineuser from the DB.
exports.destroy = function(req, res) {
  Onlineuser.findById(req.params.id, function (err, onlineuser) {
    if(err) { return handleError(res, err); }
    if(!onlineuser) { return res.send(404); }
    onlineuser.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
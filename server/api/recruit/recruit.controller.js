'use strict';

var Recruit     = require('./recruit.model');
var config      = require('../../config/environment');

/**
 * Get list of recruiting status
 * restriction: 'admin'
 */
// Get list of servers
exports.index = function(req, res) {
  Recruit.find(function (err, recruits) {
    if(err) { return handleError(res, err); }
   return res.status(200).json(recruits)
  });
};

// Get a single server
exports.show = function(req, res) {
  Recruit.findById(req.params.id, function (err, recruit) {
    if(err) { return handleError(res, err); }
    if(!recruit) { return res.send(404); }
    return res.json(recruit);
  });
};

/**
 * Creates a new recruiting need
 */
exports.create = function (req, res, next) {
  var recruit = new Recruit ();
  recruit.classType = req.body.classType;
  recruit.currentStatus = req.body.currentStatus;
  recruit.quantity = req.body.quantity;
  recruit.classImage = req.body.classImage;
  recruit.created = req.body.created;

  recruit.save(function(err, recruit) {
    if (err) 
      res.send(err);
    res.json({ message: 'recruiting status saved to the database', data: recruit });
  });
};

// Updates an existing server in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Recruit.findById(req.params.id, function (err, recruit) {
    if (err) { return handleError(res, err); }
    if(!recruit) { return res.send(404); }
    var updated = _.merge(recruit, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, recruit);
    });
  });
};

// Deletes a server from the DB.
exports.destroy = function(req, res) {
  Recruit.findById(req.params.id, function (err, recruit) {
    if(err) { return handleError(res, err); }
    if(!recruit) { return res.send(404); }
    recruit.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
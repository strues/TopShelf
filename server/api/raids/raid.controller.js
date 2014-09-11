'use strict';

var Application     = require('./raid.model');
var mongoose = require('mongoose');
var config      = require('../../config/environment');
var User = require('../users/user.model');

var _ = require('lodash');

/**
 * Get list of applications
 * restriction: 'admin'
 */
// Get list of servers
exports.index = function(req, res) {
  Raid.find(function (err, applications) {
    if(err) { return handleError(res, err); }
   return res.status(200).json(applications)
  });
};

// Get a single server
exports.show = function(req, res) {
  Raid.findById(req.params.id, function (err, raid) {
    if(err) { return handleError(res, err); }
    if(!raid) { return res.send(404); }
    return res.json(raid);
  });
};

/**
 * Creates a new application
 */
exports.create = function (req, res, next) {
  var raid = new Raid ();
  raid.date = req.body.date;
  raid.raidZone = req.body.raidZone;
  raid.desc = req.body.desc;
  raid.comments = req.body.comments;
  raid.raiderStatus = req.body.raiderStatus;
  raiderStatus.raider = req.body.raider;
  raiderStatus.attending = req.body.attending;
  raiderStatus.absent = req.body.absent;
  raiderStatus.late = req.body.late;

  raid.save(function(err, raid) {
    if (err)
      res.send(err);
    res.json({ message: 'Raid saved to the database', data: raid });
  });
};

// Updates an existing server in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Raid.findById(req.params.id, function (err, raid) {
    if (err) { return handleError(res, err); }
    if(!raid) { return res.send(404); }
    var updated = _.merge(raid, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, raid);
    });
  });
};

// Deletes a server from the DB.
exports.destroy = function(req, res) {
  Raid.findById(req.params.id, function (err, raid) {
    if(err) { return handleError(res, err); }
    if(!raid) { return res.send(404); }
    raid.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
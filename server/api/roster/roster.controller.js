'use strict';

var Roster     = require('./roster.model');
var mongoose = require('mongoose');
var config      = require('../../config/environment');
var User = require('../users/user.model');

var _ = require('lodash');

/**
 * Get list of rosters
 * restriction: 'admin'
 */
// Get list of servers
exports.index = function(req, res) {
  Roster.find(function (err, rosters) {
    if(err) { return handleError(res, err); }
   return res.status(200).json(rosters)
  });
};

// Get a single server
exports.show = function(req, res) {
  Roster.findById(req.params.id, function (err, roster) {
    if(err) { return handleError(res, err); }
    if(!roster) { return res.send(404); }
    return res.json(roster);
  });
};

/**
 * Creates a new roster
 */
exports.create = function (req, res, next) {
  var roster = new Roster ();
  roster.charName = req.body.charName;
  roster.charClass = req.body.charClass;
  roster.charSpec = req.body.charSpec;
  roster.charOffSpec = req.body.charOffSpec;
  roster.charArmory = req.body.charArmory;
  roster.isAlt = req.body.isAlt;
  roster.altOf = req.body.altOf;
  roster.owner = req.body.owner;

  roster.save(function(err, roster) {
    if (err)
      res.send(err);
    res.json({ message: 'roster saved to the database', data: roster });
  });
};

// Updates an existing server in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Roster.findById(req.params.id, function (err, roster) {
    if (err) { return handleError(res, err); }
    if(!roster) { return res.send(404); }
    var updated = _.merge(roster, req.body);
    roster.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, roster);
    });
  });
};

// Deletes a server from the DB.
exports.destroy = function(req, res) {
  Roster.findById(req.params.id, function (err, roster) {
    if(err) { return handleError(res, err); }
    if(!roster) { return res.send(404); }
    roster.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
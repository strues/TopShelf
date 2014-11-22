'use strict';

var _ = require('lodash');
var Roster = require('./roster.model');
//var columnDefs = Roster.getUiGridColumnDefinition(); //[ { name: 'Code', field: 'code' }, { name: 'Color', field: 'color' } ]

// Get list of posts
exports.index = function(req, res) {
  Roster.find(function (err, rosters) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(rosters);
  });
};
// Get a single roster
exports.show = function(req, res) {
  Roster.findById(req.params.id, function (err, roster) {
    if(err) { return handleError(res, err); }
    if(!roster) { return res.send(404); }
    return res.json(roster);
  });
};

// Creates a new roster in the DB.
exports.create = function(req, res) {
  Roster.create(req.body, function(err, roster) {
    if(err) { return handleError(res, err); }
    return res.json(201, roster);
  });
};

// Updates an existing roster in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Roster.findById(req.params.id, function (err, roster) {
    if (err) { return handleError(res, err); }
    if(!roster) { return res.send(404); }
    // var updated = _.merge(roster, req.body);
    var updated = _.extend(roster, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(roster);
    });
  });
};

// Deletes a roster from the DB.
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

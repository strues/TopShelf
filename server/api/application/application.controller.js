'use strict';

var _ = require('lodash');
var Application = require('./application.model');

// Get list of applications
exports.index = function(req, res) {
  Application.find(function (err, applications) {
    if(err) { return handleError(res, err); }
    return res.json(200, applications);
  });
};

// Get a single application
exports.show = function(req, res) {
  Application.findById(req.params.id, function (err, application) {
    if(err) { return handleError(res, err); }
    if(!application) { return res.send(404); }
    return res.json(application);
  });
};

// Creates a new application in the DB.
exports.create = function(req, res) {
  Application.create(req.body, function(err, application) {
    if(err) { return handleError(res, err); }
    return res.json(201, application);
  });
};

// Updates an existing application in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Application.findById(req.params.id, function (err, application) {
    if (err) { return handleError(res, err); }
    if(!application) { return res.send(404); }
    var updated = _.merge(application, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, application);
    });
  });
};

// Deletes a application from the DB.
exports.destroy = function(req, res) {
  Application.findById(req.params.id, function (err, application) {
    if(err) { return handleError(res, err); }
    if(!application) { return res.send(404); }
    application.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
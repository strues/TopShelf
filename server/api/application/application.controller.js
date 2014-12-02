/**
 *
 * GET     /applications              ->  index
 * POST    /applications              ->  create
 * GET     /applications/:id          ->  show
 * PUT     /applications/:id          ->  update
 * DELETE  /applications/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Application = require('./application.model');
var User = require('../user/user.model');

// Get list of applications
exports.index = function(req, res) {
  Application.loadRecent(function (err, applications) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(applications);
  });
};

// Get a single application
exports.show = function(req, res) {
  var author = req.user.name;
  Application.findById(req.params.id).populate('user', 'name').exec(function (err, application) {
    if(err) { return handleError(res, err); }
    if(!application) { return res.send(404); }
    return res.json(application);
  });
};

exports.like = function(req, res) {
  var id = req.body._id || '';
  if (id == '') {
    return res.send(400);
  }


  Application.update({_id: id}, { $inc: { likes: 1 } }, function(err, nbRows, raw) {
    if (err) {
      console.log(err);
      return res.send(400);
    }

    return res.send(200);
  });
};

exports.unlike = function(req, res) {
  var id = req.body._id || '';
  if (id == '') {
    return res.send(400);
  }


  Application.update({_id: id}, { $inc: { likes: -1 } }, function(err, nbRows, raw) {
    if (err) {
      console.log(err);
      return res.send(400);
    }

    return res.send(200);
  });
};

// Creates a new application in the DB.
exports.create = function(req, res) {
  Application.create(req.body, function(err, application) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(application);
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
      return res.status(200).json(application);
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
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

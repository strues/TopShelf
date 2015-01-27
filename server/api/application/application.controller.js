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
var moment = require('moment');
var Application = require('./application.model');
var User = require('../user/user.model');

/**
 * [all List of applications]
 * @param  {[get]} req [gets all applications]
 * @param  {[populate]} res [returns the user's name]
 * @return {[applications]}     [description]
 */
exports.all = function(req, res) {
    Application.find().populate('applicant', 'name')
        .exec(function(err, applications) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(applications);
        });
};

// Get a single application
exports.get = function(req, res) {
    Application.findById(req.params.id)
    .populate('applicant', 'name')
    .exec(function (err, application) {
        if (err) { return handleError(res, err); }
        if (!application) { return res.sendStatus(404); }
        return res.json(application);
    });
};

// Creates a new application in the DB.
exports.create = function(req, res) {
    Application.create(req.body, function(err, application) {
        if (err) { return handleError(res, err); }
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
        if (err) { return handleError(res, err); }
        if (!application) { return res.send(404); }
        application.remove(function(err) {
        if (err) { return handleError(res, err); }
        return res.sendStatus(204);
    });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}

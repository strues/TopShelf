/**
 *
 * GET     /characters              ->  index
 * POST    /characters              ->  create
 * GET     /characters/:id          ->  show
 * PUT     /characters/:id          ->  update
 * DELETE  /characters/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Character = require('./character.model');
var User = require('../user/user.model');

// Get list of characters
exports.index = function(req, res) {
  Character.loadOwner(function (err, characters) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(characters);
  });
};

// Get a single character
exports.show = function(req, res) {
  var owner = req.user.name;
  Character.findById(req.params.id).populate('user', 'name').exec(function (err, character) {
    if(err) { return handleError(res, err); }
    if(!character) { return res.send(404); }
    return res.json(character);
  });
};

// Creates a new character in the DB.
exports.create = function(req, res) {
  Character.create(req.body, function(err, character) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(character);
  });
};

// Updates an existing character in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Character.findById(req.params.id, function (err, character) {
    if (err) { return handleError(res, err); }
    if(!character) { return res.send(404); }
    var updated = _.merge(character, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(character);
    });
  });
};

// Deletes a character from the DB.
exports.destroy = function(req, res) {
  Character.findById(req.params.id, function (err, character) {
    if(err) { return handleError(res, err); }
    if(!character) { return res.send(404); }
    character.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

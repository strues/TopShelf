'use strict';

var _         = require('lodash');
var mongoose  = require('mongoose'),
    User      =  require('./user.model'),
    async     = require('async'),
    express   = require('express'),
    moment    = require('moment'),
    config    = require('../../config/environment'),
    request   = require('request'),
    qs        = require('querystring'),
    jwt       = require('jwt-simple'),
    Auth      = require('../../auth/auth.service');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * @api {post} /users Create a new user
 * @apiVersion 0.1.0
 * @apiName CreateUser
 * @apiDescription Create a new user in the database.
 * @apiGroup User
 *
 * @apiParam {String} email user's email.
 *
 */
exports.create = function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) { return handleError(res, err); }
    var token = jwt.sign(
      { _id: user._id },
      config.secrets.session,
      { expiresInMinutes: 60 * 5 }
    );
    res.status(201).json({ token: token, user: user });
  });
};

/**
 * @api {get} /users/me Get the logged user
 * @apiVersion 0.1.0
 * @apiName GetMe
 * @apiDescription Return the user matching the authenticated user.
 * @apiGroup User
 *
 */
exports.getMe = function (req, res) {
  User.findById(req.user, function(err, user) {
      res.send(user);
    });
};

exports.editMe = function(req, res) {
      User.findById(req.user, function(err, user) {
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
      user.displayName = req.body.displayName || user.displayName;
      // user.email = req.body.email || user.email;
      user.save(function(err) {
        res.status(200).end();
      });
    });
}

exports.list = function(req, res) {
      User.find({}, function(err, users) {
      var userArr = [];

      users.forEach(function(user) {
        userArr.push(user);
      });

      res.send(userArr);
    });
}

'use strict';

var _      = require('lodash'); //jshint ignore:line
var User   = require('./user.model'),
    request = require('request'),
    auth = require('../../auth/auth.service'),
    config = require('../../config/environment'),
    jwt    = require('jwt-simple');

function handleError(res, err) {
  return res.status(500).send(err);
}

function validationError(res, err) {
  res.status(422).json(err);
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
exports.create = function(req, res) {
  User.create(req.body, function(err, user) {
    if (err) {
      return handleError(res, err);
    }
    var token = jwt.sign({
        _id: user._id
      },
      config.secrets.session, {
        expiresInMinutes: 60 * 5
      }
    );
    res.status(201).json({
      token: token,
      user: user
    });
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
exports.getMe = function(req, res) {
  User.findById(req.user, function(err, user) {
    res.send(user);
  });
};

exports.editMe = function(req, res) {
  var oldPass = req.body.oldPassword ? String(req.body.oldPassword) : null;
  var newPass = req.body.newPassword ? String(req.body.newPassword) : null;

  User.findById(req.user, '+password', function(err, user) {
    if (!user) {
      return res.status(400).send({
        message: 'User not found'
      });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.email = req.body.email || user.email;
    if (newPass) {
      user.password = newPass;
    }
    // Users with local authentication require password.
    if (user.providers.indexOf('local') !== -1) {
      user.comparePassword(oldPass, function(err, isMatch) {
        console.log(arguments);
        if (!isMatch) {
          return res.status(401).send({
            message: 'Wrong password'
          });
        }
        user.save(function(err) {
          if (err) {
            validationError(res, err);
          }
          res.status(200).end();
        });
      });
    } else {
      if (newPass) {
        user.providers.push('local');
      }
      user.save(function(err) {
        if (err) {
          validationError(res, err);
        }
        res.status(200).end();
      });
    }
  });
};

exports.list = function(req, res) {
  User.find({}, function(err, users) {
    var userArr = [];

    users.forEach(function(user) {
      userArr.push(user);
    });

    res.send(userArr);
  });
};

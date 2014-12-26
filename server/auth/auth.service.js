'use strict';

var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({ secret: config.secrets.session });


/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id, function (err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.sendStatus(401);
        }
        req.user = user;
        next();
      });
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }
  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.sendStatus(403);
      }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
  var payload = { _id: id };
  if (role !== null) {
    payload.role = role;
  }
  return jwt.sign(payload, config.secrets.session, { expiresInMinutes: 30 * 24 * 60 });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setToken(req, res) {
  if (!req.user) {
    return res.json(404, { message: 'Something went wrong, please try again.'});
  }
  var token = signToken(req.user._id, req.user.role, { expiresInMinutes: 30 * 24 * 60 });
  res.cookie('token', JSON.stringify(token));
  res.send({
    token: token,
    user: User,
    role: User.role
  });
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setToken = setToken;

'use strict';

/**
 * Module for setting up the authentication service functions.
 * Utility and service methods for the authentication and authorization services
 * @module {object} auth:service
 */

var mongoose = require('mongoose'),
  config = require('../config/environment'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  _ = require('lodash'),
  expressJwt = require('express-jwt'),
  compose = require('composable-middleware'),
  User = require('../api/user/user.model'),
  moment = require('moment');

var validateJwt = expressJwt({
  secret: config.session.secret
});
/**
 * Attaches the user object to the request if authenticated
 * otherwise returns 403
 * @return {express.middleware}
 */
function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).end();

        req.user = user;
        next();
      });
    });
}

/**
 * Creates the JWT signed with secret
 */
function createToken(user) {
  var payload = {
    sub: user._id,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.session.secret);
}

/**
 * Checks if the user role meets the minimum requirements of the route, sets
 * the response status to FORBIDDEN if the requirements do not match.
 * @param {String} roleRequired - Name of the required role
 * @return {ServerResponse}
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('You need to attach a role.');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)) {
        next();
      }
      else {
        res.sendStatus(403);
      }
    });
}

/**
 * If there is a user, appends it to the req
 * else req.user would be undefined
 */
function appendUser() {
  return compose()
    // Attach user to request
    .use(function(req, res, next) {
      validateJwt(req, res, function(val) {
        if (_.isUndefined(val)) {
          User.findById(req.user._id, function(err, user) {
            if (err) {
              return next(err);
            }
            else if (!user) {
              req.user = undefined;
              return next();
            }
            else {
              req.user = user;
              next();
            }
          });
        }
        else {
          req.user = undefined;
          next();
        }
      });
    });
}
/**
 * Takes the token cookie and adds the header
 * for it on the request
 */
function addAuthHeaderFromCookie() {
  return compose()
    .use(function(req, res, next) {
      if (req.cookies.token) {
        req.headers.authorization = 'Bearer ' + _.trim(req.cookies.token,
          '\"');
      }
      return next();
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
  var payload = {
    _id: id
  };
  if (role !== null) {
    payload.role = role;
  }
  return jwt.sign(payload, config.session.secret, {
    expiresInMinutes: 30 * 24 * 60
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setToken(req, res) {
  if (!req.userInfo) {
    return res.json(404, {
      message: 'Something went wrong, please try again.'
    });
  }
  var token = signToken(req.user._id, req.user.role);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}

module.exports = {

  /**
   * Middleware for checking for valid authentication
   * @see {auth:service~ensureAuthenticated}
   */
  isAuthenticated: isAuthenticated,

  /**
   * Middleware for checking for a minimum role
   * @see {auth:service~hasRole}
   */
  hasRole: hasRole,

  /**
   * Utility functions for handling user roles
   * @type {Object}
   */
  signToken: signToken,

  /**
   * Utility function, checks if admin is true or false
   * @type {Object}
   */
  setToken: setToken,
  appendUser: appendUser,
  addAuthHeaderFromCookie: addAuthHeaderFromCookie
};

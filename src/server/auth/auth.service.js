'use strict';

/**
 * Module for setting up the authentication service functions.
 * Utility and service methods for the authentication and authorization services
 * @module {object} auth:service
 */

var mongoose = require('mongoose'),
  config = require('../config/environment'),
  jwt = require('jwt-simple'),
  compose = require('composable-middleware'),
  roles = require('./roles.service'),
  moment = require('moment');

/**
 * Attaches the user object to the request if authenticated
 * otherwise returns 403
 * @return {express.middleware}
 */
function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'Please make sure your' +
        'request has an Authorization header'
    });
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null
  try {
    payload = jwt.decode(token, config.session.secret);
  }
  catch (err) {
    return res.status(401).send({
      message: err.message
    });
  }
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({
      message: 'Token has expired'
    });
  }
  req.user = payload.sub;
  next();
}

/**
 * Creates the JWT signed with secret
 */
function createToken(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
    role: user.role,
    isAdmin: user.isAdmin
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
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(ensureAuthenticated)
    .use(function meetsRequirements(req, res, next) {
      if (roles.hasRole(req.role, roleRequired)) {
        next();
      }
      else {
        res.sendStatus(403);
      }
    });
}

function ensureAdmin(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json(
      'Please make sure your request has an Authorization header'
    );
  }
  var token = req.headers.authorization.split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, config.session.secret);
  }
  catch (err) {
    return res.status(401).send({
      message: err.message
    });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).json('Token has expired');
  }
  req.user = payload.sub;
  req.user.role = payload.role;
  req.isAdmin = payload.isAdmin;

  if (!req.isAdmin) {
    return res.status(401).json('Not authorized');
  }
  next();
}

/**
 * Check if the user is authenticated or not
 * If authenticated, pass on req.user
 *
 * @param req
 * @param res
 * @param next
 */
function checkAuthenticated(req, res, next) {
  var token = req.headers.authorization ?
    req.headers.authorization.split(' ')[1] : null;
  var payload = token ? jwt.decode(token, config.session.secret) : null;
  if (payload) {
    req.user = payload.sub;
  }
  next();
}

module.exports = {

  /**
   * Middleware for checking for valid authentication
   * @see {auth:service~ensureAuthenticated}
   */
  ensureAuthenticated: ensureAuthenticated,

  /**
   * Middleware for creating the token
   * @see {auth:service~createToken}
   */
  createToken: createToken,

  /**
   * Middleware for creating the token
   * @see {auth:service~createToken}
   */
  checkAuthenticated: checkAuthenticated,

  /**
   * Middleware for checking for a minimum role
   * @see {auth:service~hasRole}
   */
  hasRole: hasRole,

  /**
   * Utility functions for handling user roles
   * @type {Object}
   */
  roles: roles,

  /**
   * Utility function, checks if admin is true or false
   * @type {Object}
   */
  ensureAdmin: ensureAdmin
};

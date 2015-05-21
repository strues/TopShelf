'use strict';

/**
 * Module for setting up the authentication service functions.
 * Utility and service methods for the authentication and authorization services
 * @module {object} auth:service
 */
var request = require('request');
var mongoose        = require('mongoose'),
    config          = require('../config/environment'),
    jwt             = require('jwt-simple'),
    compose         = require('composable-middleware'),
    moment          = require('moment');

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
   * Middleware for checking for a minimum role
   * @see {auth:service~hasRole}
   */
  hasRole: hasRole,

  /**
   * Utility functions for handling user roles
   * @type {Object}
   */
  ensureAdmin: ensureAdmin

};

/**
 * Attaches the user object to the request if authenticated
 * otherwise returns 403
 * @return {express.middleware}
 */
function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Please make sure your' +
    'request has an Authorization header');
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, config.secrets.session);
  if (payload.exp <= moment().unix()) {
    return res.status(401).send('Token has expired.');
  }
  req.user = payload.sub;
  req.role = payload.role;
  next();
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
  return jwt.encode(payload, config.secrets.session);
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
      } else {
        res.sendStatus(403);
      }
    });
}

/**
 * Make sure user is authenticated and is authorized as an administrator
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function ensureAdmin(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send({message:
        'Please make sure your request has an Authorization header'});
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, config.secrets.session);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({message: 'Token has expired'});
    }
    req.user = payload.sub;
    req.role = payload.role;

    if (roles.hasRole(!req.role)) {
      return res.status(401).send({message: 'Not authorized'});
    }
    next();
  }


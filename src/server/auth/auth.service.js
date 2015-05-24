'use strict';

/**
 * Module for setting up the authentication service functions.
 * Utility and service methods for the authentication and authorization services
 * @module {object} auth:service
 */
var config  = require('../config/environment'),
    jwt     = require('jwt-simple'),
    moment  = require('moment');

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
   * Determines if the user has admin ability or not.
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
  req.isAdmin = payload.role;
  next();
}

/**
 * Creates the JWT signed with secret
 */
function createToken(user) {
  var payload = {
    sub: user._id,
    role: user.isAdmin,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.secrets.session);
}

/**
 * Make sure user is authenticated and is authorized as an administrator
 */
function ensureAdmin(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'Please make sure your request has an Authorization header'
    });
  }
  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, config.secrets.session);
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({
      message: 'Token has expired'
    });
  }
  req.user = payload.sub;
  req.isAdmin = payload.role;

  if (!req.isAdmin) {
    return res.status(401).send({
      message: 'Not authorized'
    });
  }
  next();
}

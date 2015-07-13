/**
 * Module for setting up the authentication service functions.
 * Utility and service methods for the authentication and authorization services
 * @module {object} auth:service
 */
import jwt from 'jsonwebtoken';
import compose from 'composable-middleware';
import _ from 'lodash';
import moment from 'moment';
import expressJwt from 'express-jwt';

let config = require('../config/environment'),
  User = require('../api/user/user.model');

let validateJwt = expressJwt({
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
    .use((req, res, next) => {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token') && typeof req.query.access_token === 'string') {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).end();
        }

        req.user = user;
        next();
      });
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
  let payload = {
    _id: id,
    role: role
  };

  return jwt.sign(payload, config.session.secret, {
    expiresInMinutes: moment().add(14, 'days').unix()
  });
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
      } else {
        res.sendStatus(403).end();
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
            } else if (!user) {
              req.user = undefined;
              return next();
            } else {
              req.user = user;
              next();
            }
          });
        } else {
          req.user = undefined;
          next();
        }
      });
    });
}

function ensureAuthorized(req, res, next) {
  let bearerToken;
  let bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
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

  appendUser: appendUser,

  ensureAuthorized: ensureAuthorized
};

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
import User from '../api/user/user.model';
import Roles from '../api/roles/roles.model';

let config = require('../config/environment');

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
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token') && typeof req.query.access_token === 'string') {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id, function(err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.send(401);
        }
        if (!user.enabled) {
          return res.send(401);
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
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.send(403);
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

/**
 * Checks if the user role has permission to use the route.
 * First we check if the user is authenticated by calling `isAuthenticated()`.
 * Then we search the roles database for the role the user has.
 * If the role is found and has the permission name we want or the `allPrivilages` permission then we allow their request to go through.
 * Otherwise we send back a 403.
 * @param {string} permissionName The name of the permission to see if the user has
 */
function hasPermission(permissionName) {
  if (!permissionName) {
    throw new Error('Required role needs to be set');
  }
  return compose()
    .use(isAuthenticated())
    .use(function roleHasPermission(req, res, next) {
      Roles.findOne({
        role: req.user.role
      }, function(error, found) {
        if (!found) {
          res.send(403);
          return false;
        }
        if (found.permissions[permissionName] || found.permissions.allPrivilages) {
          next();
        } else {
          res.send(403);
        }
      });
    });
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

  hasPermission: hasPermission
};

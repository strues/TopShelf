/**
 * Module for setting up the authentication service functions.
 * Utility and service methods for the authentication and authorization services.
 * @module {object} auth:service
 */
'use strict';

var mongoose        = require('mongoose'),
    config          = require('../config/environment'),
    roles           = require('./roles.service'),
    jwt             = require('jsonwebtoken'),
    expressJwt      = require('express-jwt'),
    compose         = require('composable-middleware'),
    contextService  = require('request-context'),
    User            = require('../api/user/user.model');

var validateJwt = expressJwt({secret: config.secrets.session});

module.exports = {

    /**
     * Middleware for checking for valid authentication
     * @see {auth:service~isAuthenticated}
     */
    isAuthenticated: isAuthenticated,

    /**
     * Middleware for checking for a minimum role
     * @see {auth:service~hasRole}
     */
    hasRole: hasRole,

    /**
     * Middleware for add the current user object to the request context as the given name
     * @see {auth:service~addAuthContex}
     * @type {Function}

     */
    addAuthContext: addAuthContext,

    /**
     * Sign a token with a user id
     * @see {auth:service~signToken}
     */
    signToken: signToken,

    /**
     * Set a signed token cookie
     * @see {auth:service~setTokenCookie}
     */
    setToken: setToken,

    /**
     * Utility functions for handling user roles
     * @type {Object}
     */
    roles: roles

};

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
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
        User.findById(req.user._id, function (err, user) {
            if (err) return next(err);
            if (!user) return res.sendStatus(401);

            req.user = user;
            next();
        });
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
        throw new Error('Required role needs to be set');
    }

    return compose()
      .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
        if (roles.hasRole(req.user.role, roleRequired)) {
            next();
        } else {
            res.forbidden();
        }
    });
}
/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, role) {
    var payload = {_id: id};
    if (role !== null) {
        payload.role = role;
    }
    return jwt.sign(payload, config.secrets.session, {expiresInMinutes: 30 * 24 * 60});
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setToken(req, res) {
    if (!req.user) {
        return res.json(404, {message: 'Something went wrong, please try again.'});
    }
    var token = signToken(req.user._id, req.user.role, {expiresInMinutes: 30 * 24 * 60});
    res.cookie('token', JSON.stringify(token));
    res.send({
        token: token,
        user: User,
        role: User.role
    });
}

/**
 * Add the current user object to the request context as the given name
 * @param {request} req - The request message object
 * @param {ServerResponse} res - The outgoing response object
 * @param {function} next - The next handler callback
 */
function addAuthContext(namespace) {
    if (!namespace) {
        throw new Error('No context namespace specified!');
    }

    return function addAuthContextMiddleWare(req, res, next) {
        contextService.setContext(namespace, req.user);
        next();
    };
}


'use strict';

var _ = require('lodash');
var ParamController = require('../../components/controllers/param.controller');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

/**
 * The User model instance
 * @type {user:model~User}
 */
var User = require('./user.model').model;

exports = module.exports = UserController;
/**
 * UserController constructor
 * @classdesc Controller that handles /api/users route requests
 * for the user api.
 * Uses the 'id' parameter and the 'user' request property
 * to operate with the [main user API Model]{@link user:model~User} model.
 * @constructor
 * @inherits ParamController
 * @see user:model~User
 */
function UserController(router) {
  ParamController.call(this, User, 'id', 'userDocument', router);
  this.select = ['-salt', '-hashedPassword'];
  this.omit = ['salt', 'hashedPassword'];
  this.defaultReturn = 'profile';
}

UserController.prototype = {
  /**
   * Set our own constructor property for instanceof checks
   * @private
   */
  constructor: UserController,

  /**
   * @api {post} /users Add New User
   * @apiName create
   * @apiGroup User
   *
   * @apiParam {String} name Username of the new user.
   * @apiParam {String} email Email address of the user.
   * @apiParam {String} password Password for the user.
   * @apiParam {String} battletag The user's battletag.
   * @apiParam {String} role The user's role.
   *
   * @apiSuccess {String} token Returns a token to the user.
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 OK
   */
  create: function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
      if (err) return res.handleError(err);
      var token = jwt.sign({
        _id: user._id
      }, config.secrets.session, {
        expiresInMinutes: 60 * 5
      });
      res.json({
        token: token
      });
    });
  },

  /**
   * Deletes a user
   * restriction: 'admin'
   */
  destroy: function(req, res) {
    User.findByIdAndRemove(req[this.paramName].id, function(err, user) {
      if (err) return res.status(500).json(err);
      return res.sendStatus(200);
    });
  },
  /**
   * Replaces an existing user password in the DB using the request body
   * property named 'password'. Should be an admin only route.
   * @param {IncomingMessage} req - The request message object
   * @param {ServerResponse} res - The outgoing response object
   * @returns {ServerResponse} The updated document or NOT FOUND if no document has been found
   */
  setPassword: function (req, res) {
    // check for a user id
    if (!req[this.paramName]._id) {
      return res.badRequest();
    }

    req[this.paramName].password = req.body.password;
    delete req.body.password;

    req[this.paramName].save(function (err) {
      if (err) {
        return res.handleError(err);
      }
      return res.noContent();
    });
  },
  /**
     * Change the password of a user in the DB. The 'oldPassword' and 'newPassword' property of the
     * request body are used.
     * @param {IncomingMessage} req - The request message object containing the 'oldPassword' and 'newPassword' property
     * @param {ServerResponse} res - The outgoing response object
     * @param {function} next - The next handler function
     * @returns {ServerResponse} The response status OK or FORBIDDEN if an error occurs
     */
  changePassword: function (req, res, next) {
    var userId = req[this.paramName]._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    this.model.findOne({'_id': userId}, function (err, user) {
      if (user.authenticate(oldPass)) {
        user.password = newPass;

        user.save(function (err) {
          if (err) {
            return res.handleError(err);
          }
          return res.noContent();
        });
      } else {
        res.forbidden();
      }
    });
  },

  /**
   * Lookup a user by its id
   * @param  {incomingMessage}   req  The request message object the user object is read from
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @param  {[type]}   id   [description]
   * @return {[type]}        [description]
   */
  userByID: function(req, res, next, id) {
    User.findOne({
      _id: id
    }).exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
  },

  /**
   * Get the authenticated user for the current request.
   * The requested user id is read from the userInfo parameter of the request object.
   * @param {IncomingMessage} req - The request message object the user object is read from
   * @param {ServerResponse} res - The outgoing response object
   * @param {function} next - The next handler function
   * @returns {ServerResponse} The virtual 'profile' of this user or UNAUTHORIZED if no document has been found
   */
  me: function (req, res, next) {
    if (!req.userInfo) {
      return res.unauthorized();
    }

    return res.ok(req.userInfo.profile);
  },

  /**
   * OAuth callback
   */
  oauthCallback: function(strategy) {
    return function(req, res, next) {
      passport.authenticate(strategy, function(err, user, redirectURL) {
        if (err || !user) {
          return res.redirect('/#!/login');
        }
        req.login(user, function(err) {
          if (err) {
            return res.redirect('/#!/login');
          }

          return res.redirect(redirectURL || '/');
        });
      })(req, res, next);
    };
  },

  /**
   * Authentication callback function, redirecting to '/'.
   * @param {IncomingMessage} req - The request message object
   * @param {ServerResponse} res - The outgoing response object that is redirected
   */
  authCallback: function (req, res) {
    res.redirect('/');
  }
};

UserController.prototype = _.create(ParamController.prototype,
  UserController.prototype);

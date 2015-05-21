/**
 * Module for registering authentication middleware.
 * Registers the local authentication provider by default.
 * @module {express.Router} auth
 * @requires {@link user:model}
 * @requires {@link auth:local}
 * @requires {@link auth:local:passport}
 */
'use strict';

var router = require('express').Router();
var auth = require('./auth.service');
var config = require('../config/environment');

/**
 * The authentication model: User
 * @type {user:model~User}
 */
var User = require('../api/user/user.model');

// export the configures express router
module.exports = router;

// apply authentication routes for the providers
//router.use('/local', require('./local/index'));

  /**
   * @api {post} /auth/login Authenticate the user
   * @apiName Login
   * @apiGroup User
   */
  router.post('/login', function(req, res) {
    User.findOne({
      email: req.body.email
    }, '+password', function(err, user) {
      if (!user) {
        return res.status(401).send({
          message: 'Wrong email and/or password'
        });
      }
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (!isMatch) {
          return res.status(401).send({
            message: 'Wrong email and/or password'
          });
        }
        res.send({
          token: auth.createToken(user)
        });
      });
    });
  });
   /**
   * @api {post} /auth/signup Create a new user
   * @apiName Signup
   * @apiGroup User
   */
  router.post('/signup', function(req, res) {
    var user = new User();
    user.displayName = req.body.displayName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = 'user';

    user.save(function(err) {
      if (err) {
        return res.send(err);
      }
      res.status(200).send({token: auth.createToken(user)});
    });
  });

   /**
   * @api {post} /auth/google oAuth with google
   * @apiName Google
   * @apiGroup User
   */
  router.post('/google', function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl =
    'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
      code: req.body.code,
      client_id: req.body.clientId,
      client_secret: config.GOOGLE_SECRET,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {
      json: true,
      form: params
    }, function(err, response, token) {
      var accessToken = token.access_token;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      };

      // Step 2. Retrieve profile information about the current user.
      request.get({
        url: peopleApiUrl,
        headers: headers,
        json: true
      }, function(err, response, profile) {

        // Step 3a. Link user accounts.
        if (req.headers.authorization) {
          User.findOne({
            google: profile.sub
          }, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({
                message: 'There is already a Google account that belongs to you'
              });
            }
            var token = req.headers.authorization.split(' ')[1];
            var payload = jwt.decode(token, config.secrets.session);
            User.findById(payload.sub, function(err, user) {
              if (!user) {
                return res.status(400).send({
                  message: 'User not found'
                });
              }
              user.google = profile.sub;
              user.picture = user.picture || profile.picture
              .replace('sz=50', 'sz=200');
              user.displayName = user.displayName || profile.name;
              user.save(function() {
                var token = auth.createToken(user);
                res.send({
                  token: token
                });
              });
            });
          });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          User.findOne({
            google: profile.sub
          }, function(err, existingUser) {
            if (existingUser) {
              return res.send({
                token: auth.createToken(existingUser)
              });
            }
            var user = new User();
            user.google = profile.sub;
            user.picture = profile.picture.replace('sz=50', 'sz=200');
            user.displayName = profile.name;
            user.save(function(err) {
              var token = auth.createToken(user);
              res.send({
                token: token
              });
            });
          });
        }
      });
    });
  });

    /**
   * @api {post} /auth/unlink/:provider Remove the oAuth provider
   * @apiName Unlink
   * @apiGroup User
   */
  router.get('/unlink/:provider', auth.ensureAuthenticated,
    function(req, res) {
    var provider = req.params.provider;
    User.findById(req.user, function(err, user) {
      if (!user) {
        return res.status(400).send({
          message: 'User not found'
        });
      }
      user[provider] = undefined;
      user.save(function() {
        res.status(200).end();
      });
    });
  });


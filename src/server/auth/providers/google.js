//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var request = require('request');
var config = require('../../config/environment');
var auth = require('../auth.service');
var User = require('../../api/user/user.model');

function validationError(res, err) {
  res.status(422).json(err);
}

/*
 * Login with Google
 * */
router.post('/', function(req, res) {
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl =
  'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code, //jscs:disable
    client_id: req.body.clientId, //jshint ignore:line
    client_secret: config.google.clientSecret, //jshint ignore:line
    redirect_uri: req.body.redirectUri, //jshint ignore:line
    grant_type: 'authorization_code' //jshint ignore:line
  };//jscs:enable

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, {
    json: true,
    form: params//jscs:disable
  }, function(err, response, token) {
    var accessToken = token.access_token; //jshint ignore:line
    var headers = {
      Authorization: 'Bearer ' + accessToken
    };//jscs:enable

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
              message: 'This Google account is already linked to another account.'
            });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = jwt.decode(token, config.session.secret);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({
                message: 'User not found'
              });
            }
            user.google = profile.sub;
            user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
            user.displayName = user.displayName || profile.name;
            user.email = user.email || profile.email;
            if (user.providers.indexOf('google') === -1) {
              user.providers.push('google');
            }
            user.save(function(err) {
              if (err) {
                return validationError(res, err);
              }
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
          user.email = profile.email;
          user.isAdmin = false;
          user.providers = ['google'];
          user.save(function(err) {
            if (err) {
              // could not save the user, maybe email is already taken.
              return validationError(res, err);
            }
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

module.exports = router;

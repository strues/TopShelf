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

router.post('/', function(req, res) {
  var accessTokenUrl = 'https://topshelfguild.com/forums/api/index.php?oauth/token';
  var profileUrl = 'ttps://topshelfguild.com/forums/api/index.php?users/me';
  var formData = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.xenforo.clientSecret,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post({ url: accessTokenUrl, form: formData, json: true }, function(err, response, body) {
    var params = {
      v: '20140806',
      oauth_token: body.access_token
    };

    // Step 2. Retrieve information about the current user.
    request.get({ url: profileUrl, qs: params, json: true }, function(err, response, profile) {
      profile = profile.response.user;

      // Step 3a. Link user accounts.
      if (req.headers.authorization) {
        User.findOne({ xenforo: profile.id }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Forums account that belongs to you' });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.xenforo = profile.id;
            user.picture = user.picture || profile.photo.prefix + '300x300' + profile.photo.suffix;
            user.displayName = user.displayName || profile.username + ' ' + profile.lastName;
            user.save(function() {
              var token = createToken(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        User.findOne({ xenforo: profile.id }, function(err, existingUser) {
          if (existingUser) {
            var token = createToken(existingUser);
            return res.send({ token: token });
          }
          var user = new User();
          user.xenforo = profile.id;
          user.picture = profile.photo.prefix + '300x300' + profile.photo.suffix;
          user.displayName = profile.username + ' ' + profile.lastName;
          user.save(function() {
            var token = createToken(user);
            res.send({ token: token });
          });
        });
      }
    });
  });
});

module.exports = router;

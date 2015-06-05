//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var request = require('request');
var config = require('../../config/environment');
var auth = require('../auth.service');
var User = require('../../api/user/user.model');

function validationError(res, err)
{
  res.status(422).json(err);
}

/*
 * Login with Battlenet
 * */

router.post('/', function(req, res) {
  var accessTokenUrl = 'https://us.battle.net/oauth/token';
  var battletagUrl = 'https://us.api.battle.net/account/user';
  var charactersUrl = 'https://us.api.battle.net/wow/user/characters';

  var params = {
    code: req.body.code, //jscs:disable
    client_id: req.body.clientId, //jshint ignore:line
    redirect_uri: req.body.redirectUri, //jshint ignore:line
    client_secret: config.battlenet.clientSecret, //jshint ignore:line
    grant_type: 'authorization_code'
  }; //jscs:enable

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl,
    {
      json: true,
      form: params
    },
    function(err, response, token) {
      var accessToken = token.access_token;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      };
      if (response.statusCode !== 200) {
        return res.status(response.statusCode).send({
          message: body.error_description
        });
      }

      // Step 2. Retrieve profile information about the current user.
      request.get({
        url: battletagUrl,
        headers: headers,
        json: true}, function(err, response, profile) {
        var battletag = response.body.battletag;
        //console.log(response);
        if (response.statusCode !== 200)
        {return res.status(500).send({
            message: profile.error.message});
        } if (req.headers.authorization) {
          User.findOne({battlenet: profile.sub}, function(err, existingUser) {
            if (existingUser) {
              return res.status(409).send({
                message: 'This Battlenet account is already linked.'
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

              user.battlenet = profile.sub;
              user.battletag = user.battletag || profile.battletag;

              if (user.providers.indexOf('battlenet') === -1) {
                user.providers.push('battlenet');
              }
              user.save(function(err) {
                if (err) {
                  return validationError(res, err);
                }
                var token = auth.createToken(user);
                res.send({token: token, battletag: battletag});
                console.log('payload.sub', payload.sub);
              });
            });
          });
        } else {
          // Step 3b. Create a new user account or return an existing one.
          User.findOne({battlenet: profile.sub}, function(err, existingUser) {
            if (existingUser) {
              return res.send({token: auth.createToken(req, existingUser)});
            }

            var user = new User();
            user.battlenet = profile.sub;
            user.displayName = battletag;
            user.battletag = battletag;
            user.providers = 'battlenet';
            user.save(function(err) {
              if (err) {
                // could not save the user, maybe email is already taken.
                return validationError(res, err);
              }
              var token = auth.createToken(user);
              res.send({token: token});
            });
          });
        }
      });
    });
});

module.exports = router;

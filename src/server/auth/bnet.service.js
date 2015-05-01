var passport = require('passport');
var BnetStrategy    = require('passport-bnet').Strategy;
var User            = require('../api/user/user.model');
var userController  = require('../api/user/user.controller');
var CONFIG          = require('../config/environment');
var BNET_ID         = CONFIG.bnet.clientID;
var BNET_SECRET     = CONFIG.bnet.clientSecret;

module.exports = function(passport) {
  // Use the BnetStrategy within Passport.
  passport.use(new BnetStrategy({
    clientID: 'urtsw3rtx2p5x4hy48efamnw39x8s7qw',
    clientSecret: 'uk8AAtvP5ZsMM5tSdSn3kJ8YHxYWypw3',
    scope: 'wow.profile',
    callbackURL: 'https://localhost:8443/auth/bnet/callback'
  },
        function (accessToken, refreshToken, profile, done) {

          // append auth
          profile.oauth = {
            accessToken: accessToken
          };

          process.nextTick(function() {
            User.findOne({
              'bnetId': profile.id
            }, function(err, user) {
              return userController.login(profile, err, user, done);
            });
          });
        })
    );
}

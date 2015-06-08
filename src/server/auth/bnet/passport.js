var passport = require('passport');
var config = require('../../config/environment');
var BnetStrategy = require('passport-bnet').Strategy;
var User = require('../../api/user/user.model');
var userController = require('../../api/user/user.controller');

exports.setup = function(User, config) {
  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
      done(null, obj);
  });
  passport.use(new BnetStrategy({
      clientID: config.bnet.clientId,
      clientSecret: config.bnet.clientSecret,
      scope: 'wow.profile',
      callbackURL: '/auth/bnet'
    },
    function(accessToken, refreshToken, profile, done) {
      profile.oauth = {
        accessToken: accessToken
      };
      process.nextTick(function() {
        User.findOne({
          'bnetId': profile.id
        }, function(err, user) {
          return userController.login(profile, err, user,
            done);
        });
      });
    }));
};

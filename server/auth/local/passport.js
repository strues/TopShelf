'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {

        if (!user) {
          return done(null, false, {message: 'This email is not registered.'});
        }

        user.authenticate(password, function(authError, authenticated) {
          if (authError) {
            return done(authError);
          }
          if (!authenticated) {
            return done(null, false, {message: 'This password is not correct.'});
          } else {
  // update the user's record with login timestamp
          user.activity.last_logon = Date.now();
            return done(null, user);
          }
        });
      });
    }
  ));
};

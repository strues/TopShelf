var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;

exports.setup = function (User, config) {


passport.use(
  new BnetStrategy(
    { clientID: 'guamkwyf4rxq8pvwuzhftz2yzut44ufa',
      clientSecret: 'M76WCRvv9GVuMnCGVbrKSxaJA9MHRCfK',
      scope: "wow.profile",
      callbackURL: "https://guildr.me/auth/bnet/callback" },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile);
      });
    })
);

};
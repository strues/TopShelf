'use strict';
var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;
var config = require('../../config/environment');
/**
 * Battlenet API
 * Uses OAuth 2.0 Strategy.
 */
exports.setup = function (User) {
    passport.use('bnet', new BnetStrategy({
      authorizationURL: 'https://us.battle.net/oauth/authorize',
      tokenURL: 'https://us.battle.net/oauth/token',
      clientID: config.bnet.clientID,
      clientSecret: config.bnet.clientSecret,
      callbackURL: config.bnet.callbackURL,
      scope: 'wow.profile sc2.profile',
      passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, done) {
    User.findById(req.user._id, function (err, user) {
        user.tokens.push({kind: 'bnet', accessToken: accessToken});
        user.save(function (err) {
            done(err, user);
        });
    });
}));
}

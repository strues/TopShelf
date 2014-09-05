var passport = require('passport');
var BnetStrategy = require('passport-bnet').Strategy;

exports.setup = function (User, config) {


// Use the BnetStrategy within Passport.
    passport.use(new BnetStrategy({
        clientID: config.bnet.clientID,
        clientSecret: config.bnet.clientSecret,
        callbackURL: "https://topshelfguild.com/auth/bnet/callback"
    }, function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

};
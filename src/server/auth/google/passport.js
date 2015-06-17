import passport from 'passport';
import request from 'request';

var config = require('../../config/environment'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function(User, config) {
	passport.use(new GoogleStrategy({
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
			callbackURL: config.google.callbackURL,
			passReqToCallback: true
		},
		function(req, accessToken, refreshToken, profile, done) {
			if (req.user) {
				User.findById(req.user._id, function(err, user) {
					if (user) {
						user.providers.google = true;
						user.google = profile._json;
						user.save((err) => {
							if (err) {return done(err); }
							return done(err, user);
						});
					} else {
						return done(err);
					}
				});
			}
			else {
				User.findOne({
					'google.id': profile._json.id
				}, (err, user) => {
					if (!user) {
						user = new User({
							name: profile.displayName,
							email: profile.emails[0].value,
							role: 'user',
							username: profile.username,
							provider: 'google',
							google: profile._json
						});
						user.save((err) => {
							if (err) {return done(err); }
							return done(err, user);
						});
					}	else {
						return done(err, user);
					}
				});
			}
		}
	))
};

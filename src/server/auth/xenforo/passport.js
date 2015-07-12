import passport from 'passport';
import {
  Strategy as OAuth2Strategy
}
from 'passport-oauth2';
import User from '../../api/user/user.model';

exports.setup = () => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  passport.use('xf', new OAuth2Strategy({
    authorizationURL: 'https://topshelfguild.com/forums/api/oauth/authorize',
    tokenURL: 'https://topshelfguild.com/forums/api/oauth/token',
    clientID: 'topk3k',
    clientSecret: 'g3tr3kt',
    callbackURL: 'http://localhost:9000/auth/xf/callback',
    passReqToCallback: true,
    profileURL: 'https://topshelfguild.com/forums/api/users/me'
  }, (req, accessToken, refreshToken, profile, done) => {
    console.log('logging accessToken ', accessToken);
    User.findOne({
      'xf.id': profile.id
    }, function(err, user) {
      if (!user) {
        user = new User({
          username: profile.username,
          email: profile.email,
          role: 'user',
          provider: 'xf',
        });
        user.xf.token = accessToken;
        user.loginCount++;
        user.save(function() {
          if (err) {
            done(err);
          }
          console.log(user);
          return done(err, user);
        });
      } else {
        console.log(user);
        return done(err, user);
      }
    });
  }));
};

import passport from 'passport';
import {
  Strategy as LocalStrategy
}
from 'passport-local';
import User from '../../api/user/user.model';

exports.setup = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.findOne({
      email: email
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          msg: 'email not found'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          msg: 'incorrect password'
        });
      }
      return done(null, user);
    });
  }));
};

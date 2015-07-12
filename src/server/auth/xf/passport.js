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
    console.log('logging profile ', profile);

    process.nextTick(function() {
      if (req.user) {
        //USER IS ALREADY LOGGED IN
        return done(null, req.user);

      } else if (!req.user) {
        //USER IS NOT LOGGED IN
        User.findOne({
          'xf.id': profile.id
        }, function(err, user) {
          if (err) {
            return done(err);
          }
          if (user) {
            //LOGIN
            user.provider = 'xf';
            user.xf.token = accessToken;
            console.log(accessToken);
            user.loginCount++;
            user.save(function() {
              if (err) {
                throw err;
              }
              return done(null, user);
            });
          } else {
            //SIGNUP
            if (profile.email && profile.email[0].value) {
              //USER HAS PUBLIC GOOGLE MAIL
              let commonMail = profile.email[0].value.toLowerCase();
              //CHECK IF USER IS ALREADY SIGNED UP WITH FB
              User.findOne({
                'email': profile._json.email
              }, function() {
                if (err) {
                  throw err;
                }
                if (user) {
                  //USER HAS THE SAME EMAIL OF ANOTHER PROVIDER
                  user.provider = 'xf';
                  user.xf.id = profile.id;
                  user.xf.token = accessToken;
                  user.xf.username = profile.username;

                  user.loginCount++;
                  user.save(function() {
                    if (err) {
                      throw err;
                    }
                    return done(null, user);
                  });
                } else {
                  let newUser = new User();
                  newUser.provider = 'xf';
                  newUser.xf.id = profile.id;
                  newUser.email = profile._json.email;
                  newUser.xf.token = accessToken;
                  newUser.xf.username = profile.username;

                  newUser.email = commonMail;
                  newUser.save(function() {
                    if (err) {
                      throw err;
                    }
                    return done(null, newUser);
                  });
                }
              });
            } else {
              //USER HAS NO PUBLIC GOOGLE MAIL
              let newUser = new User();
              newUser.provider = 'xf';
              newUser.xf.id = profile.id;
              newUser.xf.token = accessToken;
              newUser.xf.username = profile.username;

              newUser.save(function() {
                if (err) {
                  throw err;
                }
                return done(null, newUser);
              });
            }
          }
        }); // user find
      } // } else if (!req.user) {
    }); //process.nextTick(fun
  }));
};

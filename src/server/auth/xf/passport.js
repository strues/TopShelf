import passport from 'passport';
const configure = require('../../config/environment');

var OAuth2Strategy = require('passport-oauth2').Strategy;
exports.setup = (User) => {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
       var sessionUser = { _id: user._id, username: user.username, email: user.email, role: user.role };
  done(null, sessionUser);
    });

    // used to deserialize the user
passport.deserializeUser( (sessionUser, done) => {
  // The sessionUser object is different from the user mongoose collection
  // it's actually req.session.passport.user and comes from the session collection
  done(null, sessionUser);
});

    passport.use(new OAuth2Strategy({
            authorizationURL: 'https://topshelfguild.com/forums/api/oauth/authorize',
            tokenURL: 'https://topshelfguild.com/forums/api/oauth/token',
            clientID: configure.xenforo.ClientID,
            clientSecret: configure.xenforo.clientSecret,
            callbackURL: 'http://localhost:9000/auth/xf/callback',
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, done) => {
            // asynchronous verification, for effect...
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
                            user.save(function(err) {
                                if (err) throw err;
                                return done(null, user);
                            });
                        } else {
                            //SIGNUP
                            if (profile.email && profile.email[0].value) {
                                //USER HAS PUBLIC GOOGLE MAIL
                                var commonMail = profile.email[0].value.toLowerCase();
                                //CHECK IF USER IS ALREADY SIGNED UP WITH FB
                                User.findOne({
                                    'email': profile._json.email
                                }, function(err, user) {
                                    if (err) throw err;
                                    if (user) {
                                        //USER HAS THE SAME EMAIL OF ANOTHER PROVIDER
                                        user.provider = 'xf';
                                        user.xf.id = profile.id;
                                        user.xf.token = accessToken;
                                        user.xf.username = profile.username;

                                        user.loginCount++;
                                        user.save(function(err) {
                                            if (err) throw err;
                                            return done(null, user);
                                        });
                                    } else {
                                        var newUser = new User();
                                        newUser.provider = 'xf';
                                        newUser.xf.id = profile.id;
                                        newUser.email = profile._json.email;
                                        newUser.xf.token = accessToken;
                                        newUser.xf.username = profile.username;

                                        newUser.email = commonMail;
                                        newUser.save(function(err) {
                                            if (err) throw err;
                                            return done(null, newUser);
                                        });
                                    }
                                });
                            } else {
                                //USER HAS NO PUBLIC GOOGLE MAIL
                                var newUser = new User();
                                newUser.provider = 'xf';
                                newUser.xf.id = profile.id;
                                newUser.xf.token = accessToken;
                                newUser.xf.username = profile.username;

                                newUser.save(function(err) {
                                    if (err) throw err;
                                    return done(null, newUser);
                                });
                            }
                        }
                    }); // user find
                } // } else if (!req.user) {
            }); //process.nextTick(fun
          }
));
};

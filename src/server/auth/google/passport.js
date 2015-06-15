'use strict';

var util = require('../../util'),
    config = require('../../config/environment'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    request = require('request');

exports.setup = function(User, config) {
  passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
    passReqToCallback: true
  },
function(req, accessToken, refreshToken, profile, done) {
// If user is logged in when request is processed
if (req.user) {
User.findById(req.user._id, function(err, user) {
if (user) {
user.providers.google = true;
user.google = profile._json;
user.save(function(err) {
if (err) done(err);
return done(err, user);
});
} else {
return done(err);
}
});
} else {
User.findOne({
'google.id': profile._json.id
})
.exec(function(err, user) {
  if (err) return done(err);

  // User is logging in with this account
  if (user) return done(err, user);

  // There are no users linked to this account. Make a new one
  else {
    profile._json.image.url = profile._json.image.url.replace('?sz=50', '');

    var newUser = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      role: 'user',
      provider: 'google',
      providers: {
        google: true
      },
      google: profile._json
    });

    var profilePic = profile._json.image.url,
        picName = profilePic.split('/')[profilePic.split('/').length - 1];

    util.saveFileFromUrl(profilePic, {
      filename: picName,
      content_type: 'image/jpeg'
    })
        .catch(done)
            .then(function(file) {
              console.log(file);
              newUser.imageId = file._id;

              util.createThumbnail(file._id, {
                filename: picName + '_thumbnail'
              })
                  .catch(done)
                    .then(function(thumbnail) {
                      console.log(thumbnail);
                      newUser.smallImageId = thumbnail.id;

                      newUser.save(function(err) {
                        if (err) return done(err);
                        return done(err, newUser);
                      });
                    });
            });
  }
});
}
        }
    ));
};

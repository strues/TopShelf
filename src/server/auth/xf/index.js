import express from 'express';
import passport from 'passport';
import auth from '../auth.service';

let router = express.Router();
// After authorization, Google
//   will redirect the user back to this application at /auth/xf/callback
router.get('/', passport.authenticate('oauth2', {scope: ['read', 'post'] }),
  function(req, res, next){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

router.get('/callback', function(req, res, next) {
  passport.authenticate('oauth2', function(err, user, info) {
    if (err) return next(err);
    if (!user) return res.redirect('/');
    req.logIn(user, function(err) {
      if (err) return next(err);
      res.redirect('/');
    });
  })(req, res, next);
});

export default router;

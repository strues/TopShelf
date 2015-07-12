import express from 'express';
import passport from 'passport';
import auth from '../auth.service';

let router = express.Router();

// After authorization, Google
//   will redirect the user back to this application at /auth/xf/callback
router.get('/', passport.authenticate('xf', {
    session: false
  }),
  function(req, res, next) {
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

router.get('/callback', passport.authenticate('xf'),
  function(req, res, err, next, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/');
    }
    req.logIn(user, function() {
      if (err) {
        return next(err);
      }

      res.redirect('/');
    });
  });


export default router;

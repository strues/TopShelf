import express from 'express';
import passport from 'passport';
//import auth from '../auth.service';

let router = express.Router();

// After authorization, Google
//   will redirect the user back to this application at /auth/xf/callback
router.get('/', passport.authenticate('xf', {
    session: false
  }));

router.get('/callback', passport.authenticate('xf'),
  function(req, res) {
      res.redirect('/');
    });

export default router;

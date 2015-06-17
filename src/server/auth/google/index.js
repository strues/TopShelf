import express from 'express';
import passport from 'passport';
import auth from '../auth.service';

var router = express.Router();

router
    .get('/', passport.authenticate('google', {
        failureRedirect: '/account/signup',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        session: false
    }))

    .get('/callback', auth.appendUser(),
      passport.authenticate('google', {
        failureRedirect: '/account/signup',
        session: false
    }), auth.setTokenCookie);

export default router;

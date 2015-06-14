'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
    .get('/', passport.authenticate('google', {
        failureRedirect: '/signup',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        session: false
    }))

    .get('/callback', auth.addAuthHeaderFromCookie(), auth.appendUser(), passport.authenticate('google', {
        failureRedirect: '/signup',
        session: false
    }), auth.setTokenCookie);

module.exports = router;

'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('bnet', {
    failureRedirect: '/',
    scope: 'wow.profile',
    session: false
  }))

  .get('/callback', passport.authenticate('bnet', {
    failureRedirect: '/',
    session: false
  }), auth.setTokenCookie);

module.exports = router;

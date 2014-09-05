'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../authorization.service');

var router = express.Router();


router.get('/auth/bnet',
    passport.authenticate('bnet'));

router.get('/auth/bnet/callback',
    passport.authenticate('bnet', { failureRedirect: '/' }),
    function(req, res){
        res.redirect('/');
    });

module.exports = router;
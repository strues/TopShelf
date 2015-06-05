'use strict';

var express = require('express');
var router  = express.Router();

router.use('/', require('./providers/local'));
//router.use('/xf', require('./providers/xf'));
//router.use('/twitter', require('./providers/twitter'));
router.use('/google', require('./providers/google'));
router.use('/battlenet', require('./providers/battlenet'));
router.use('/unlink', require('./providers/unlink'));

module.exports = router;

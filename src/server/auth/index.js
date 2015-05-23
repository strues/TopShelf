// jscs:disable
// jshint ignore: start
/**
 * Module for registering authentication middleware.
 * Registers the local authentication provider by default.
 * @module {express.Router} auth
 * @requires {@link auth:facebook}
 * @requires {@link auth:google}
 * @requires {@link auth:local}
 * @requires {@link auth:unlink}
 */

'use strict';

var express = require('express');
var router = express.Router();

router.use('/', require('./providers/local'));
router.use('/facebook', require('./providers/facebook'));
router.use('/google', require('./providers/google'));
router.use('/unlink', require('./providers/unlink'));

module.exports = router;

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/users/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);
require('./bnet/passport').setup(User, config);
//require('./twitter/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
//router.use('/twitter', require('./twitter'));
router.use('/bnet', require('./bnet'));

module.exports = router;
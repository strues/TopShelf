import express from 'express';
import passport from 'passport';
import User from '../api/user/user.model';
import config from '../config/environment';

// Passport Configuration
require('./local/passport').setup(User, config);

let router = express.Router();

router.use('/local', require('./local'));

module.exports = router;

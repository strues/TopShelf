import express from 'express';
import User from '../api/user/user.model';
import config from '../config/environment';

// Passport Configuration
require('./local/passport').setup(User, config);
require('./xf/passport').setup(User, config);

let router = express.Router();
router.use('/xf', require('./xf'));
router.use('/local', require('./local'));

module.exports = router;

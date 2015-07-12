import express from 'express';
import User from '../api/user/user.model';
import config from '../config/environment';



let router = express.Router();
router.use('/xf', require('./xenforo'));
router.use('/local', require('./local'));
// Passport Configuration
require('./local/passport').setup(User, config);
require('./xenforo/passport').setup(User, config);
module.exports = router;

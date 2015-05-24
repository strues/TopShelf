'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

router.get('/me', auth.ensureAuthenticated, controller.getMe);
router.put('/me', auth.ensureAuthenticated, controller.editMe);
router.get('/', controller.list);
router.post('/', controller.create);

// Export the configured express router for the user api routes
module.exports = router;

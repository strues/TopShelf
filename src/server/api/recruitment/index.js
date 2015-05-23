'use strict';

var express    = require('express'),
    controller = require('./recruitment.controller'),
    auth       = require('../../auth/auth.service');

var router = express.Router();

// Export the configured express router for the post api routes
module.exports = router;

// check if the authenticated user has at least the 'admin' role
var isAdmin = auth.ensureAdmin;

router.get('/', controller.list);
router.get('/:id', controller.show);
router.post('/', isAdmin, controller.create);
router.delete('/:id', isAdmin, controller.destroy);

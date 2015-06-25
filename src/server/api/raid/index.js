import express from 'express';
var controller = require('./raid.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

// Export the configured express router for the post api routes
module.exports = router;

router.get('/', controller.index);
router.post('/', auth.isAuthenticated(), controller.create);

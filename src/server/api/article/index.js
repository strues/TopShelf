'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth = require('../../auth/auth.service');
var Article = require('./article.model');
var router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:id/comment', auth.isAuthenticated(), controller.addComment);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/:id/comment/:commentId', controller.removeComment);

// Export the configured express router for the article api routes
module.exports = router;

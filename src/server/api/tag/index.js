'use strict';

var express = require('express');
var controller = require('./tag.controller');
var Post = require('../post/post.controller');
var router = express.Router();

// Export the configured express router for the post api routes
module.exports = router;

//router.get('/posts/tags/:tagName', Post.listByTag);
router.get('/tagcloud', Post.tagcloud);

router.param('tagName', function(req, res, next, tagName) {
      req.tagName = tagName;
      next();
  });

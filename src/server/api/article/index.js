'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth = require('../../auth/auth.service');
var Article = require('./article.model');
var router = express.Router();

// Export the configured express router for the article api routes
module.exports = router;

// check if the used is authenticated at all
var isAuthenticated = auth.isAuthenticated();

// check if the authenticated user has at least the 'admin' role
var isAdmin = auth.hasRole('admin');

router.param('article', function(req, res, next, id) {
  var query = Article.findById(id);

  query.exec(function (err, article) {
    if (err) {
      return next(err);
    }
    if (!article) {
      return next(new Error('cant find article'));
    }
    req.article.update({'$inc': {views: 1}}, {w: 1}, function() {});
    req.article = article;
    return next();
  });
});

router.param('author', controller.getListByAuthor);

router.get('/', controller.list);
router.get('/author/:author', controller.getListByAuthor);
router.get('/:id', controller.show);
router.post('/', isAdmin, controller.create);
router.put('/:id', isAdmin, controller.update);
router.patch('/:id', isAdmin, controller.update);
router.delete('/:id', isAdmin, controller.destroy);

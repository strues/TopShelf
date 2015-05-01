'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');
var Post = require('./post.model');
var router = express.Router();

// Export the configured express router for the post api routes
module.exports = router;

// check if the used is authenticated at all
var isAuthenticated = auth.isAuthenticated();

// check if the authenticated user has at least the 'admin' role
var isAdmin = auth.hasRole('admin');

router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function (err, post) {
        if (err) {
            return next(err);
        }
        if (!post) {
            return next(new Error('cant find post'));
        }

        req.post = post;
        return next();
    });
});

router.param('author', controller.getListByAuthor);

router.get('/', controller.index);
router.get('/author/:author', controller.getListByAuthor);
router.get('/:id', controller.show);
router.post('/', isAdmin, controller.create);
router.put('/:id', isAdmin, controller.update);
router.patch('/:id', isAdmin, controller.update);
router.delete('/:id', isAdmin, controller.destroy);

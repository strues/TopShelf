'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');
var Post = require('./post.model');
var router = express.Router();

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
router.param('tag', controller.getListByTag);

router.get('/', controller.index);
router.get('/tag/:tag', controller.index)
router.get('/author/:author', controller.index)
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;

'use strict';

var express = require('express');
var controller = require('./post.controller');
var Comment = require('../comment/comment.model');
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
router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function (err, comment) {
        if (err) { return next(err); }
        if (!comment) { return next(new Error('cant find comment')); }

        req.comment = comment;
        return next();
    });
});
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.post('/:id/comments', controller.createComment);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

router.put('/:id/comments/:comment/upvote', function(req, res, next) {
    req.comment.upvote(function(err, comment) {
        if (err) { return next(err); }

        res.json(comment);
    });
});

router.put('/:id/upvote', function(req, res, next) {
    req.post.upvote(function(err, post) {
        if (err) { return next(err); }

        res.json(post);
    });
});

module.exports = router;

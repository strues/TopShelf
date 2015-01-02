'use strict';

var express = require('express');
var controller = require('./post.controller');
var Comment = require('../comment/comment.model');
var auth = require('../../auth/auth.service');
var Post = require('./post.model');
var router = express.Router();

router.param('comment', function(req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function (err, comment) {
        if (err) { return next(err); }
        if (!comment) { return next(new Error('can\'t find comment')); }

        req.comment = comment;
        return next();
    });
});
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
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

router.post('/:id/comments', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment) {
        if (err) {
            return next(err);
        }

        req.post.comments.push(comment);
        req.post.save(function(err, post) {
        if (err) {
            return next(err);
        }

        res.json(comment);
    });
    });
});

module.exports = router;

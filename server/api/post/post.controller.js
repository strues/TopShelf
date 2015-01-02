'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var Comment = require('../comment/comment.model');

// Get list of posts
exports.index = function(req, res) {
    Post.find().populate('author', 'name').exec(function(err, posts) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(posts);
    });
};

// Get a single post
exports.show = function(req, res) {
    Post.findById(req.params.id)
    .populate('author', 'name')
    .populate('comments')
    .exec(function (err, post) {
        if (err) {
            return handleError(res, err);
        }
        if (!post) {
            return res.sendStatus(404);
        }
        return res.json(post);
    });
};

// Creates a new post in the DB.
exports.create = function(req, res) {
    Post.create(_.merge({author: req.user._id}, req.body), function(err, post) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(post);
    });
};

// Creates a new comment in the DB.
exports.createComment = function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment) {
     if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(comment);
    });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            return handleError(res, err);
        }
        if (!post) {
            return res.sendStatus(404);
        }

        var updated = _.merge(post, req.body);
        console.log(updated.category);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            console.log(updated.category);
            return res.status(200).json(updated);
        });
    });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            return handleError(res, err);
        }
        if (!post) {
            return res.sendStatus(404);
        }
        post.remove(function(err) {
        if (err) {
            return handleError(res, err);
        }
        return res.sendStatus(204);
    });
    });
};

function handleError(res, err) {
    return res.status(500).json(err);
}

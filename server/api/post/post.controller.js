'use strict';

var _ = require('lodash');
var Post = require('./post.model');

// Get list of posts
exports.index = function(req, res) {
    Post.find().populate('author', 'username')
    .exec(function(err, posts) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(posts);
    });
};

// Get a single post
exports.show = function(req, res) {
    Post.findById(req.params.id)
    .populate('author', 'username')
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

// Updates an existing post in the DB.
exports.update = function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            return handleError(res, err);
        }
        if (!post) {
            return res.sendStatus(404);
        }

// set the new user information if it exists in the request
        if (req.body.title) post.title = req.body.title;
        if (req.body.date) post.date = req.body.date;
        if (req.body.content) post.content = req.body.content;
        if (req.body.tags) post.tags = req.body.tags;
        if (req.body.image) post.image = req.body.image;

        post.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            console.log('post updated');
            return res.status(200).json(post);
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

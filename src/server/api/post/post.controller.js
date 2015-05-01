/*jshint node:true*/
'use strict';

var _ = require('lodash');
var async = require('async');
var Post = require('./post.model'),
    Tag = require('../tag/tag.model'),
    User = require('../user/user.model');

// Get list of posts
exports.index = function(req, res) {
    Post.find()
        .sort('-created')
        .populate('author', 'username')
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
        .exec(function(err, post) {
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
    Post.create(_.merge({
        author: req.user._id
    }, req.body), function(err, post) {
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
        if (req.body.lastUpdated) post.lastUpdated = req.body.date;
        if (req.body.slug) post.slug = req.body.slug;
        if (req.body.description) post.description = req.body.description;
        if (req.body.content) post.content = req.body.content;
        if (req.body.state) post.state = req.body.state;
        if (req.body.tags) post.tags = req.body.tags;
        if (req.body.image) post.image = req.body.image;
        if (req.body.lrgImage) post.lrgImage = req.body.lrgImage;

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
    Post.findById(req.params.id, function(err, post) {
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
// TODO: Broken get by author
exports.getListByAuthor = function(req, res, next, author) {
    return User.findOne({
        author: author
    }).exec(function(err, user) {
        if (err) {
            return next(new Error('Find user(' + author + ') failed: ' + err));
        } else if (!user) {
            res.statusCode = 404;
            return res.end();
        } else {
            return Post.find({
                    author: user._id,
                    Status: 'Published'
                }).populate('author', 'username')
                .sort('-created').exec(function(err, posts) {
                    if (err) {
                        return next(new Error(
                          'Failed to load posts of author(' +
                            author + '): ' + err));
                    } else {
                        req.posts = posts;
                        return next();
                    }
                });
        }
    });
};
// TODO: Broken get by tag
exports.getListByTag = function(req, res, next, tagName) {
    return Tag.find({
        TagName: tagName
    }).populate('Post').exec(function(err, tags) {
        var index, t, _i, _len;
        if (err) {
            return next(new Error('Find tag(' + tagName + ') failed: ' + err));
        } else if (!tags || tags.length === 0) {
            res.statusCode = 404;
            return res.end();
        } else {
            for (index = _i = 0, _len = tags.length; _i < _len; index = ++_i) {
                t = tags[index];
                if (t.Post.Status !== 'Published') {
                    tags.splice(index, 1);
                }
            }
            return async.map(tags, (function(tag, callback) {
                return tag.Post.populate('author tags', 'name tagName',
                    function(err, post) {
                        if (err) {
                            return callback(err);
                        } else {
                            return callback(null, post);
                        }
                    });
            }), function(err, posts) {
                if (err) {
                    return next(err);
                } else {
                    req.posts = posts;
                    return next();
                }
            });
        }
    });
};

Array.prototype.unique = function() {
    var key, output, _i, _ref, _results;
    output = {};
    _results = [];
    for (key = _i = 0, _ref = this.length; 0 <= _ref ? _i < _ref : _i > _ref;
      key = 0 <= _ref ? ++_i : --_i) {
        _results.push(output[this[key]] = this[key]);
    }
    return _results;
};

function handleError(res, err) {
    return res.status(500).json(err);
}

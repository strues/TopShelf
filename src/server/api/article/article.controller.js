/*jshint node:true*/
'use strict';

var _ = require('lodash');
var async = require('async');
var Article = require('./article.model'),
    User = require('../user/user.model');

// Get list of articles
exports.list = function(req, res) {
  var page = +req.query.page || 1,
    limit = +req.query.limit || 9;

  Article.find()
      .sort('-created')
      .populate('author', 'displayName')
      .limit(limit).skip((page - 1) * limit)
        .exec(function(err, articles) {
          if (err) {
            return handleError(res, err);
          }
          return res.status(200).json(articles);
        });
};

exports.read = function(req, res) {
  req.article.update({'$inc': {views: 1}}, {w: 1}, function() {});
  res.jsonp(req.article);
};

// Get a single post
exports.show = function(req, res) {
  Article.findById(req.params.id)
      .populate('author', 'displayName')
        .exec(function(err, article) {
          if (err) {
            return handleError(res, err);
          }
          if (!article) {
            return res.sendStatus(404);
          }
          return res.json(article);
        });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  Article.create(_.merge({author: req.user}, req.body),
    function(err, article) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(article);
  });
};

// Updates an existing article in the DB.
exports.update = function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if (err) {
      return handleError(res, err);
    }
    if (!article) {
      return res.sendStatus(404);
    }

    // set the new user information if it exists in the request
    if (req.body.title) article.title = req.body.title;
    if (req.body.date) article.date = req.body.date;
    if (req.body.lastUpdated) article.lastUpdated = req.body.date;
    if (req.body.slug) article.slug = req.body.slug;
    if (req.body.description) article.description = req.body.description;
    if (req.body.content) article.content = req.body.content;
    if (req.body.state) article.state = req.body.state;
    if (req.body.tags) article.tags = req.body.tags;
    if (req.body.image) article.image = req.body.image;
    if (req.body.lrgImage) article.lrgImage = req.body.lrgImage;
    if (req.body.views) article.views = req.body.views;

    article.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(article);
    });
  });
};

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  Article.findById(req.params.id, function(err, article) {
    if (err) {
      return handleError(res, err);
    }
    if (!article) {
      return res.sendStatus(404);
    }
    article.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.sendStatus(204);
    });
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

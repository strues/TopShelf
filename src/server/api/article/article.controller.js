/*jshint node:true*/
'use strict';

var _ = require('lodash');
var async = require('async');
var Article = require('./article.model'),
    User = require('../user/user.model'),
    QP = require('../../lib/queryParser');

/**
 * Get single post by a query
 *
 * @param {string|int} query - seoTitle or id of the post
 * @returns Post.query
 */
function singleArticleQuery(query) {
  var article;
  if (isNumeric(query)) {
    article = Article.findById(query);
  } else {
    article = Article.findOne({ 'seoTitle': query });
  }
  return article;
}

// Get list of articles
exports.list = function(req, res) {
  var page = +req.query.page || 1,
      limit = +req.query.limit || 9;

  Article.find()
      .sort('-created')
      .populate('author', 'username')
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
      .populate('comments')
      .populate('user', 'username')
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
/**
* Add comment
* @param {id} id of comment
* @param {User} user id
* @param {comment} comment text
*/
exports.addComment = function (req,res) {

  Article.findById(req.params.id).populate('user', 'username')
  .exec(function(err, article){
    if (err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    var updated = _.merge(article, req.body);

    updated.comments.push({
      content: req.body.content,
      user: req.user._id
    });

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(article);
    });
  });

};

// Creates a new article in the DB.
exports.create = function(req, res) {
  Article.create(_.merge({author: req.user._id}, req.body),
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
    if (req.body.category) article.category = req.body.category;
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

/**
* Remove comment
*
* @param {commentId} String
* @param {id} String -- blog id
*/
exports.removeComment = function(req, res) {

  Article.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    var updated = _.merge(article, req.body);

    var index = -1;
    for(var i=0;i<updated.comments.length;i++){
      if(updated.comments[i]._id === req.params.commentId){
        index=i;
      }
    }

    if (index!==-1) updated.comments.splice(index, 1);
    else return res.send(404);

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(article);
    });
  });

};
function handleError(res, err) {
  return res.status(500).json(err);
}

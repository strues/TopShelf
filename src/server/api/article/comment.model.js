'use strict';

var mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    moment       = require('moment'),
    _            = require('lodash'),
    Article      = require('./article.model'),
    User         = require('../user/user.model');

var CommentSchema = new Schema({
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upvotes: {
        type: Number,
        default: 0
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }
});

CommentSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

module.exports = mongoose.model('Comment', CommentSchema);

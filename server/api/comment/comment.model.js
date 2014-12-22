'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  Author: String,
  Email: String,
  Content: String,
  CreateDate: {
    type: Date,
    'default': Date.now
  },
  EditDate: Date,
  EditUser: String,
  Post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
});

module.exports = mongoose.model('Comment', CommentSchema);

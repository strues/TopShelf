'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  // name: String,
  // info: String,
  // active: Boolean
  date: Date,
  title: String,
  content: String,
  tags: Array,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});


module.exports = mongoose.model('Post', PostSchema);

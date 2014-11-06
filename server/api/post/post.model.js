'use strict';

var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
  // name: String,
  // info: String,
  // active: Boolean
  date: Date,
  title: String,
  content: String,
  author:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  tags: Array
});

module.exports = mongoose.model('Post', PostSchema);

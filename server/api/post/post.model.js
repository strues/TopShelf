'use strict';

var mongoose = require('mongoose');


var PostSchema = new mongoose.Schema({
  // name: String,
  // info: String,
  // active: Boolean
  date: Date,
  title: String,
  content: String,
  author: mongoose.Schema.ObjectId,
  tags: Array
});


module.exports = mongoose.model('Post', PostSchema);

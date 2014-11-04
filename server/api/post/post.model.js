'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var PostSchema = new Schema({
  // name: String,
  // info: String,
  // active: Boolean

  date: Date,
  title: String,
  content: String,
  author:[{type: Schema.Types.ObjectId, ref: 'User'}],
  tags: Array
});

module.exports = mongoose.model('Post', PostSchema);

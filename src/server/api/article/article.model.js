'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    moment   = require('moment'),
    _        = require('lodash');

var ArticleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    default: '',
    required: 'Title must be provided',
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true,
    required: 'Description must be provided'
  },
  content:{
    type: String,
    default: '',
    trim: true
  },
  slug: {
    type: String
  },
  tags: [{
    type:String,
    lowercase: true,
    default: '',
    trim: true
  }],
  state: {
    type: String,
    default: 'Draft',
    enum: ['Draft', 'Published', 'Archived']
  },
  image: String,
  featImage: String,
  views: {
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Article', ArticleSchema);

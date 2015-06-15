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
    trim: true
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  slug: {
    type: String
  },
  tags: [{
    type: String,
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
  views: {
    type: Number,
    default: 1
  },
  comments: [{
    content: { type : String, default : '', trim : true },
    user: { type : Schema.ObjectId, ref : 'User', index: true },
    createdAt: { type : Date, default : Date.now }
  }]
});

ArticleSchema.statics = {
  loadInfo: function(cb) {
    this.find({})
      .populate({
        path: 'User',
        select: 'username'
      })
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
};

module.exports = mongoose.model('Article', ArticleSchema);

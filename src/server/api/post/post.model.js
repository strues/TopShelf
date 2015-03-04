'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    moment   = require('moment'),
    _        = require('lodash');

var PostSchema = new Schema({
  title: {
    type: String
  },
  seoTitle: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date,
    default: moment()
  },
  lastUpdated: {
    type: Date
  },
  description: {
    type: String
  },
  content: {
    type: String
  },
  tags: {
    type: Array
  },
  state: {
    type: String,
    enum: ['Draft','Published', 'Archived']
  },
  image: String,
  lrgImage: String
});

PostSchema.statics = {
    loadInfo: function(cb) {
        this.find({})
        .populate({path:'User', select: 'name'})
        .sort('-date')
        .limit(20)
        .exec(cb);
    }
};

module.exports = mongoose.model('Post', PostSchema);

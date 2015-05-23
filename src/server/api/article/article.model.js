'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    moment   = require('moment'),
    _        = require('lodash');

/**
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',');
};

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',');
};

var articleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    default: '',
    required: 'Title must be provided',
    unique: true,
    validate: [
        function(title) {
          return typeof title !== 'undefined' && title.length <= 120;
        },
        'Title must not be empty or exceed 120 character max limit'
        ]
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
    required: 'A 140 character description must be provided'
  },
  content:{
    type: String,
    default: '',
    trim: true
  },
  slug: {
    type: String
  },
  tags: {
    type: [],
    get: getTags,
    set: setTags
  },
  state: {
    type: String,
    default: 'Draft',
    enum: ['Draft', 'Published', 'Archived']
  },
  image: String,
  lrgImage: String,
  views: {
    type: Number,
    default: 1
  }
});
articleSchema.index({user: 1});
articleSchema.index({tags: 1});

/**
 * Statics
 */

articleSchema.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('user', 'displayName email battletag')
      .exec(cb);
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('user', 'displayName battletag')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
}

module.exports = mongoose.model('Article', articleSchema);

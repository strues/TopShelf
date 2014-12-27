'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  content: String,
  tags: Array,
  category    : Array,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments : [{ body: String, date: Date }],
  date     : { type: Date, default: Date.now },
  images   : Array
});

PostSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate({path:'User', select: 'name'})
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
};

module.exports = mongoose.model('Post', PostSchema);

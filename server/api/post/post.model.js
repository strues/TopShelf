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

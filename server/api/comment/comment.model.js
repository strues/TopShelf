'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  body: String,
  upvotes: {type: Number, default: 0},
  post: {type: Schema.Types.ObjectId, ref: 'Post'},
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {type: Date, default: Date.now}
});

CommentSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate({path:'User', select: 'name'})
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
};

CommentSchema.methods.upvote = function(cb) {
    this.upvotes += 1;
    this.save(cb);
};

module.exports = mongoose.model('Comment', CommentSchema);

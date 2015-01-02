'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  type: {
    type : String,
    default : 'posts'
  },
  title: String,
  content: String,
  tags: Array,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {type: Date, default: Date.now},
  image: String,
  upvotes: {type: Number, default: 0},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
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

PostSchema.methods.upvote = function(cb) {
    this.upvotes += 1;
    this.save(cb);
};

module.exports = mongoose.model('Post', PostSchema);

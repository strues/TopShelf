'use strict';
 
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
var CommentSchema = new Schema({
  content: String,
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
 
CommentSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate({path:'author', select: 'username'})
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
};
 
module.exports = mongoose.model('Comment', CommentSchema);
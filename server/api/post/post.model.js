'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Post = new Schema({
  title: String,
  content: String,
  tags: Array,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {type: Date, default: Date.now},
  image: String
});

Post.statics = {
    loadRecent: function(cb) {
        this.find({})
        .populate({path:'User', select: 'username'})
        .sort('-date')
        .limit(20)
        .exec(cb);
    }
};

module.exports = mongoose.model('Post', Post);

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    default: '',
    required: 'Title must be provided',
    unique: true
  },
  seoTitle: {
      type: String,
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
    type: Date
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    default: ''
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
   body: {
       type: String,
       required: 'Comment body is required'
   },
   author: {
     name: {
         type: String,
         required: 'Author of the comment is required. (missing name)'
     },
     email: {
         type: String,
         required: 'Author of the comment is required. (missing email)'
    }
   },
   date: Date,
   isReply: Boolean
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

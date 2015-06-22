var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    _        = require('lodash');

var UploadSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  url: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  filename: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  isPrivate: Boolean,
  uploaderId: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Upload', UploadSchema);

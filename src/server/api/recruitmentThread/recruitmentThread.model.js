'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RecruitmentThreadSchema = new Schema({
  threadUrl: {
    type: String,
    default: ''
  },
  websiteName: {
    type: String,
    default: ''
  },
  threadNotes: {
    type: String
  },
  updatedOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RecruitmentThread', RecruitmentThreadSchema);

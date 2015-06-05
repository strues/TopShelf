'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecruitmentSchema = new Schema({
  classType: {
    type: String,
    default: ''
  },
  classSpec: {
    type: String,
    default: ''
  },
  priority: {
    type: String
  },
  updatedOn: {
    type: Date,
    default: Date.now
  },
  currentlyRecruiting: {type:Boolean}
});

module.exports = mongoose.model('Recruitment', RecruitmentSchema);

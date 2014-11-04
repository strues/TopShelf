'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecruitmentSchema = new Schema({
  // name: String,
  // info: String,
  // active: Boolean

  classType: String,
  classSpec: String,
  priority: String,
  status: String
});

module.exports = mongoose.model('Recruitment', RecruitmentSchema);

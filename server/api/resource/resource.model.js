'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResourceSchema = new Schema({
  websiteUrl: String,
  websiteName: String,
  websiteType: String,
  resourceDesc: String
});

module.exports = mongoose.model('Resource', ResourceSchema);

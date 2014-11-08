'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  originalFilename: String,
  serverPath : String,
  path: String,
  headers: Object,
  size: Number
});

module.exports = mongoose.model('Image', ImageSchema);
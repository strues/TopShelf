'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SlideSchema = new Schema({
  image: String,
  title: String,
  caption: String
});

module.exports = mongoose.model('Slide', SlideSchema);

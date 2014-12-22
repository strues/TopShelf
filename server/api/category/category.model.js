'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    CategoryName: String,
    Description: String,
    CreateDate: {
      type: Date,
      'default': Date.now
    },
    CreateUser: String,
    EditDate: Date,
    EditUser: String
});

module.exports = mongoose.model('Category', CategorySchema);

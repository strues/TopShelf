'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
    url: {
        type: String
    },
    uploadFile: String,
    alt: {
        type: String,
        trim: true
    },
    caption: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Image', ImageSchema);

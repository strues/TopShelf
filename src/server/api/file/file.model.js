'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FileSchema = new Schema({
    url: String,
    dateOfUploading: Date,
    fileName: String,
    isPrivate: Boolean,
    uploaderId: String
});

module.exports = mongoose.model('File', FileSchema);

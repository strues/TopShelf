'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecruitSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    currentStatus: String,
    classSpec: String,
    classType: { type: String },
    classImage: { type: String }
});

/**
 * Validations
 */


/**
 * Methods
 */



module.exports = mongoose.model('Recruit', RecruitSchema);
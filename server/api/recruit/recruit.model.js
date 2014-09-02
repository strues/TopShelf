'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecruitSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    currentStatus: {type: String },
    quantity: Number,
    classType: { type: String }
});

/**
 * Validations
 */


/**
 * Methods
 */



module.exports = mongoose.model('Recruit', RecruitSchema);
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var moment = require('moment');

var ProgressionSchema = new Schema({
    bossName: String,
    dead: Boolean,
    zone: String,
    killDate: {
      type: Date,
      default: moment()
    }
});

module.exports = mongoose.model('Progression', ProgressionSchema);

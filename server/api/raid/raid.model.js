'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var RaidSchema = new Schema({
  // name: String,
  // info: String,
  // active: Boolean

  date: Date,
  time: String,
  title: String,
  zone: String,
  difficulty: String,
  description: String,
  attendees:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Raid', RaidSchema);

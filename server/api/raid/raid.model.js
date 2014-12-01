'use strict';

var mongoose = require('mongoose'),
    _      = require('lodash'),
    Schema = mongoose.Schema;

var RaidSchema = new Schema({
  // name: String,
  // info: String,
  // active: Boolean

  date: { type: Date },
  time: String,
  title: String,
  zone: String,
  difficulty: String,
  description: String,
    raidLead: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  logs: [{
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    character: {
      name: String,
      realm: String,
      'class': String
    },
    message: String,
    date: Date
  }],
  signups: [{
    approved: { type: Boolean, default: false },
    seated: { type: Boolean, default: false },
    group: Number,
    tags: Array,
    loot: [{
      name: String,
      wowhead_url: String
    }],
    user: { type: mongoose.Schema.ObjectId, red: 'User' }
  }],
  created_at: Date,
  updated_at: Date
});

RaidSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

RaidSchema.index({ creator: 1, date: -1 });
RaidSchema.index({ 'signups.user': 1, date: -1 });
RaidSchema.index({ 'allowed.characters': 1, date: -1 });
module.exports = mongoose.model('Raid', RaidSchema);

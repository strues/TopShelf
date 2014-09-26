'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    charName: String,
    charClass: String,
    charSpec: String,
    charOffSpec: String,
    charArmory: String,
    charLogs: String,
    heroicXP: String,
    pastGuilds: String,
    screenshot: String,
    whyTS: String,
    applicant: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Application', ApplicationSchema);
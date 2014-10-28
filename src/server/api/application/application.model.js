'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
charName: {type: String, required: true},
charClass:{type: String, required: true},
charSpec: {type: String, required: true},
charArmory: {type: String, required: true},
applicantName: {type: String},
applicantAge: {type: Number, required: true},
applicantSex: {type: String},
applicantLocation: {type: String},
applicantRealId: {type: String, required: true},
voiceCom: {type: String},
charLogs: {type: String, required: true},
heroicXP: {type: String},
pastGuilds: {type: String},
screenshot: {type: String},
whyTS: {type: String},
user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Application', ApplicationSchema);

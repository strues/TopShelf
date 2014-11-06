'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ApplicationSchema = new Schema({
date: Date,
charName: {type: String},
charClass:{type: String},
charSpec: {type: String},
charArmory: {type: String},
applicantName: {type: String},
applicantAge: {type: String},
applicantSex: {type: String},
applicantLocation: {type: String},
applicantRealId: {type: String},
voiceCom: {type: String},
charLogs: {type: String},
heroicXP: {type: String},
pastGuilds: {type: String},
screenshot: {type: String},
whyTS: {type: String},
applicant: {type: ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Application', ApplicationSchema);

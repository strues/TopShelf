'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    charName: String,
    charClass: String,
    charSpec: String,
    charOffSpec: String,
    charArmory: String,
    charLogs: String,
    heroicXP: String,
    pastGuilds: String,
    microphone: String,
    pcSpecs: String,
    uiScreenshot: String,
    whyTS: String,
    user: {
    type: Schema.ObjectId,
    ref: 'User'
    }
});

/**
 * Validations
 */


/**
 * Methods
 */



module.exports = mongoose.model('Application', ApplicationSchema);
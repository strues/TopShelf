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
    btag: String,
    firstName: String,
    age: Number,
    applicant: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});


ApplicationSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

/**
 * Validations
 */


/**
 * Methods
 */



module.exports = mongoose.model('Application', ApplicationSchema);
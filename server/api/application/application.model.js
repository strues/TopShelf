'use strict';

var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    charName: {
        type: String
    },
    charClass: {
        type: String
    },
    charSpec: {
        type: String
    },
    charServer: {
        type: String
    },
    charArmory: {
        type: String
    },
    applicantName: {
        type: String
    },
    applicantAge: {
        type: String
    },
    applicantTZ: {
        type: String
    },
    applicantRealId: {
        type: String
    },
    charLogs: {
        type: String
    },
    heroicXP: {
        type: String
    },
    pastGuilds: {
        type: String
    },
    screenshot: {
        type: String
    },
    whyTS: {
        type: String
    },
    applicantJoke: {
        type: String
    },
    applicantSelfImprovement: {
        type: String
    },
    applicantAlt: {
        type: String
    },
    created: {
        type: Date,
        default: moment()
    },
    updated: {
        type: Date,
        default: moment()
    },
    applicant: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

ApplicationSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate({path:'User', select: 'name'})
      .limit(20)
      .exec(cb);
  }
};

module.exports = mongoose.model('Application', ApplicationSchema);

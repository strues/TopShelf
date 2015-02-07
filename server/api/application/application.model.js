'use strict';

var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema,
    relationship = require('mongoose-relationship');
var User = require('../user/user.model');

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
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        childPath: 'applications'
    }
});

ApplicationSchema.plugin(relationship, {relationshipPathName:'user'});
var Application = mongoose.model('Application', ApplicationSchema)

var user = new User({});
user.save();
var application = new Application({user:user._id});
application.save() //the parent children property will now contain child's id
application.remove() //the parent children property will no longer contain the child's id

module.exports = mongoose.model('Application', ApplicationSchema);

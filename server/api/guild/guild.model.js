/**
 * guild.model.js.js in web
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GuildSchema = new Schema({
    achievementPoints: Number,
    battlegroup: String,
    emblem: {
        backgroundColor: String,
        border: String,
        borderColor: String,
        icon: String,
        iconColor: String
    },

    lastUpdated: Date,
    settings: {
        webAdminBattletag: String
    },

    lastModified: Number,
    level: Number,

    members: [{
        character: {
            achievementPoints: Number,
            battlegroup: String,
            class: Number,
            gender: Number,
            guild: String,
            level: Number,
            name: String,
            race: Number,
            realm: String,
            spec: {
                backgroundImage: String,
                description: String,
                icon: String,
                name: String,
                order: Number,
                role: String
            },
            thumbnail: String
        },
        rank: Number
    }],

    name: String,
    realm: String,
    side: Number
});

module.exports = mongoose.model('Guild', GuildSchema);

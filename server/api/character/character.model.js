'use strict';

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    moment   = require('moment'),
    _        = require('lodash');

var CharacterSchema = new Schema({
    class: Number,
    gender: Number,
    guild: String,
    level: Number,
    name: String,
    race: Number,
    realm: String,
    ilevel: Number,
    thumbnail: String,
    rank: Number,
    player: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

CharacterSchema.statics = {
    loadInfo: function(cb) {
        this.find({})
        .populate({path:'User', select: 'characters'})
        .sort('-date')
        .limit(20)
        .exec(cb);
    }
};

module.exports = mongoose.model('Character', CharacterSchema);

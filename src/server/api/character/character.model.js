'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CharacterSchema = new Schema({
charName: {type: String, required: true},
charClass:{type: String, required: true},
charSpec: {type: String, required: true},
charArmory: {type: String, required: true},
updatedAt: {type: Date, required: true},
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Character', CharacterSchema);

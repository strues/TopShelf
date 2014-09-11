'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RosterSchema = new Schema({
    charName: String,
    charClass: String,
    charSpec: String,
    charOffSpec: String,
    charArmory: String,
    isAlt: Boolean,
    altOf: {type: Schema.Types.ObjectId, ref: 'User'},
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */


/**
 * Methods
 */



module.exports = mongoose.model('Roster', RosterSchema);
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RaidSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    date: Date,
    raidZone: String,
    raidDesc: String,
    comments: String,
    raiderStatus: {
        raider: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        attending: Boolean,
        late: Boolean,
        absent: Boolean
    }
});

/**
 * Validations
 */


/**
 * Methods
 */



module.exports = mongoose.model('Raid', RaidSchema);
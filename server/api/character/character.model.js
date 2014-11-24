'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CharacterSchema = new Schema({
  // name: String,
  // info: String,
  // active: Boolean

cName: { type: String },
cClass: { type: String },
cSpec: { type: String },
cRealm: { type: String },
cRace: { type: String },
cGuild: { type: String },
cArmory: { type: String },
cRank: {type: String },
owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

CharacterSchema.statics = {
loadOwner: function(cb) {
    this.find({})
      .populate({path:'User', select: 'name'})
  }
};

module.exports = mongoose.model('Character', CharacterSchema);

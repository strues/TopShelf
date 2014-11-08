'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RaidSchema = new Schema({
  // name: String,
  // info: String,
  // active: Boolean

  date: Date,
  time: String,
  title: String,
  zone: String,
  difficulty: String,
  description: String,
  raidLead: {type: Schema.Types.ObjectId, ref: 'User'},
  confirmed:[{type: Schema.Types.ObjectId, ref: 'User'}]
});

RaidSchema.statics = {
loadConfirmed: function(cb) {
    this.find({})
      .populate({path:'confirmed', select: 'name'})
      .sort('-date')
      .limit(40)
      .exec(cb);
  }
};

module.exports = mongoose.model('Raid', RaidSchema);

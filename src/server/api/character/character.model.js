'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  moment = require('moment'),
  _ = require('lodash');

var CharacterSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  class: Number,
  race: Number,
  level: Number,
  spec: {
    name: String,
    role: String,
  },
  rank: Number,
  items: Schema.Types.Mixed
});

var Raiders = mongoose.model('Character', CharacterSchema);

var myExports = {
	 raiders: Raiders
}

module.exports = myExports;

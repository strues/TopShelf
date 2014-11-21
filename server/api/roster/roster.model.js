'use strict';

var toUiGrid = require('mongoose-to-ui-grid');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RosterSchema = new Schema({
  // name: String,
  // info: String,
  // active: Boolean

  classType: { type: String, uiGrid: { name: 'Class' }},
  classSpec: { type: String, uiGrid: { name: 'Spec' }},
  name: { type: String, uiGrid: { name: 'Name' }},
  race: { type: String, uiGrid: {name: 'Race'}},
  rank: { type: String, uiGrid: {name: 'Rank'}},
  thumbnail: { type: String, uiGrid: { name: 'thumbnail' }},
  ilvl: { type: Number, uiGrid: { name: 'ilvl' }}
});



RosterSchema.plugin(toUiGrid, {});
module.exports = mongoose.model('Roster', RosterSchema, 'roster');

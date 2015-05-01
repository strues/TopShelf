'use strict';

var mongoose = require('mongoose');

/**
 * The Guild model definition
 * @type {Object}
 * @property {Number} achievementPoints - the guilds total achievements
 * @property {String} battlegroup - where the guild resides
 */
var GuildDefinition = {
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

  news: [{
    achievement: {
      accountWide: Boolean,
      criteria: [],
      description: String,
      icon: String,
      id: Number,
      points: Number,
      rewardItems: [],
      title: String
    },
    character: String,
    timestamp: Number,
    type: {type: String},
    itemId: Number
  }],

  name: String,
  realm: String,
  side: Number
};

/**
 * The Guild model schema
 * @type {MongooseSchema}
 */
var GuildSchema = new mongoose.Schema(GuildDefinition);

/**
 *  The registered mongoose model instance of the Guild model
 *  @type {Guild}
 */
var Guild = mongoose.model('Guild', GuildSchema);

module.exports = {

  /**
   * The Guild model definition object
   * @type {Object}
   * @see application:GuildModel~GuildDefinition
   */
  definition: GuildDefinition,

  /**
   * The Guild model schema
   * @type {MongooseSchema}
   * @see application:model~GuildSchema
   */
  schema: GuildSchema,

  /**
   * The Guild model instance
   * @type {application:model~Guild}
   */
  model: Guild

};


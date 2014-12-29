'use strict';

var _        = require('lodash');
var User     = require('../user/user.model');
var config   = require('../../config/environment');
var auth     = require('../../auth/auth.service');
var bnet = require('battlenet-api')();


/**
bnet.wow.guild.profile({ origin: 'us', realm: 'sargeras', name: 'top shelf' },
  { apikey: config.bnet.clientID }, function(err, guildProfile) {

  console.log(guildProfile);


    if(err) {
      return handleError(res, err);
    }
    return res.status(200).json(guildProfile);
})

}

 */
exports.getGuild = function (req, res, next) {

bnet.wow.realmStatus({ origin: 'us', realms: 'sargeras'},
  { apikey: config.bnet.clientID }, function(err, guildProfile) {

  console.log(guildProfile);


    if(err) {
      return handleError(res, err);
    }
    return res.status(200).json(guildProfile);
})

}

function handleError(res, err) {
  return res.status(500).json(err);
}
/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
  next();
};

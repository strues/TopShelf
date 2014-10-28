'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 3000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'topk3k'
  },
 tokenDuration : {
    session: 60 * 24 * 30
  },
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  bnet: {
    clientID:     process.env.BNET_ID || 'guamkwyf4rxq8pvwuzhftz2yzut44ufa',
    clientSecret: process.env.BNET_SECRET || 'M76WCRvv9GVuMnCGVbrKSxaJA9MHRCfK',
    callbackURL:  (process.env.BASE_URL || '') + 'https://localhost:8443/auth/bnet/callback'
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

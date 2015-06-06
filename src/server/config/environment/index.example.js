'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// You'll want to change everything in 'CAPS' to your settings
// ============================================
var all = {
 env: process.env.NODE_ENV,
  // Root path of server
  root: path.normalize(__dirname + '/../../..'),
  // Server port
  port: process.env.PORT || 9000, // Only applies to development
  session: {
    secret: 'YOURSECRET' // Change this to something unique
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  tokenDuration : {
    session: 60 * 24 * 30
  },
  guild: 'YOURGUILDNAME',
  realm: 'YOURREALM',
  region: 'US, EU, ETC',
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
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'dev',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      //stream: 'access.log'
    }
  },
  bnet: {
    clientID:     process.env.BNET_ID || 'APIKEY',
    clientSecret: process.env.BNET_SECRET || 'APISECRET',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/bnet/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

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
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,
  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'topk3k'
  },
  //seedDB: false,
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  tokenDuration : {
    session: 60 * 24 * 30
  },
  guild: 'Top Shelf',
  realm: 'Sargeras',
  region: 'us',
  // List of user roles
  userRoles: ['user', 'raider', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      },
      server: {
        socketOptions: {
          keepAlive: 1,
          connectTimeoutMS: 10000
        }
      },
      replset: {
        socketOptions: {
          keepAlive: 1,
          connectTimeoutMS: 10000
        }
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
  facebook: {
    clientID:     process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },
  bnet: {
    clientID:     process.env.BNET_ID || 'urtsw3rtx2p5x4hy48efamnw39x8s7qw',
    clientSecret: process.env.BNET_SECRET || 'uk8AAtvP5ZsMM5tSdSn3kJ8YHxYWypw3',
    callbackURL: 'https://localhost:8443/auth/bnet/callback'
  },
  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

'use strict';

var path = require('path');
var _ = require('lodash'); //jshint ignore:line

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
    clientSecret: process.env.FACEBOOK_SECRET || 'secret'
  },
  bnet: {
    clientSecret: process.env.BNET_SECRET || ''
  },
  twitter: {
    clientSecret: process.env.TWITTER_SECRET || 'secret'
  },

  google: {
    clientSecret: process.env.GOOGLE_SECRET || 'secret'
  },
  mailgun: {
      user: process.env.MAILGUN_USER || 'mail@topshelfguild.com',
      password: process.env.MAILGUN_PASSWORD || ''
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

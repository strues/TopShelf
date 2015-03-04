'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/topshelf-dev'
  },
 bnet: {
    clientID:     process.env.BNET_ID || '',
    clientSecret: process.env.BNET_SECRET || '',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/bnet/callback'
  }
};

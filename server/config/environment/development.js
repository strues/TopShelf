'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/angularfullstack-dev'
  },
 bnet: {
    clientID:     process.env.BNET_ID || '4gfahazrsuk3qaw4ja4ddhxcreg4qwy7',
    clientSecret: process.env.BNET_SECRET || '2qSuv8kgtg9PDyTj2UB5Ey2Q624ERaED',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/bnet/callback'
  },
  seedDB: true
};

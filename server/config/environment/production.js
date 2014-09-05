'use strict';

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip:       process.env.OPENSHIFT_NODEJS_IP ||
        process.env.IP ||
        undefined,

    // Server port
    port:     process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        9000,
    bnet: {
        clientID:     process.env.BNET_ID || 'jbdqc3ufm6hfzpymxc3ej52988vvh59b',
        clientSecret: process.env.BNET_SECRET || 'GEuXBv5wBQkdAvyyC9YkhS7XeQHTzFYe',
        callbackURL:  process.env.DOMAIN + '/auth/bnet/callback'
    },
    // MongoDB connection options
    mongo: {
        uri:    process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
            'mongodb://localhost/topshelf-dev'
    }
};
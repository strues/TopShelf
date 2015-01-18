/**
 * Main Server File
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express     = require('express'),
    mongoose    = require('mongoose'),
    config      = require('./config/environment');

// Establish Mongo Connection
mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {
    if (err) {
        console.log('Rekt, connection failed to: ' + config.mongo.uri);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + config.mongo.uri);
    }
});

// Setup server
var app         = express();
var server      = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

/*
 * Start the server
 */
//https.createServer(ssl, app).listen(8443);
server.listen(config.port, config.ip, function () {
    console.log('Express is running on %d, in %s mode',
    config.port, app.get('env'));
});

exports = module.exports = app;

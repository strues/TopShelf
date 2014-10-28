/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var fs = require('fs');
var express = require('express');
var https = require('https');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

var pkey = fs.readFileSync('./src/server/key.pem');
var pcert = fs.readFileSync('./src/server/cert.pem')
var credentials = {key: pkey, cert: pcert};
// Setup server
var app = express();
var httpsServer = https.createServer(credentials, app);
var server = require('http').createServer(app);





require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

httpsServer.listen(8443);

// expose app
var exports;
exports = module.exports = app;

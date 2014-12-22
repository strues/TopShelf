/**
 * Main application file
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express     = require('express'),
    mongoose    = require('mongoose'),
    config      = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {
  if (err) {
    console.log('Connection refused to ' + config.mongo.uri);
    console.log(err);
  } else {
    console.log('Connection successful to: ' + config.mongo.uri);
  }
});

if(config.seedDB) { require('./config/seed'); }

// Setup server
var app         = express();
var server      = require('http').createServer(app);

var socket    = require('socket.io')(server, {
    serveClient: (config.env !== 'production'),
    path: '/socket.io-client'
  });

require('./config/socketio')(socket);
require('./config/express')(app);
require('./routes')(app);


/*
 * Start the server
 */

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode',
    config.port, app.get('env'));
});

exports = module.exports = app;

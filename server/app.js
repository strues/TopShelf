/**
 * Main File for our Express backend
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express  = require('express'),
    mongoose = require('mongoose'),
    socketio = require('socket.io'),
    config   = require('./config/environment');

/*
 * Connect to database
 * Using info from environment settings
 */
mongoose.connect(config.mongo.uri, config.mongo.options);

/*
 * Make socket.io listen to the server
 */

var io = socketio.listen(server);

/*
 * Setup server
 * Require config/express(alias is app)
 * Require routes(alias is app)
 */
var app = express();
var server = require('http').createServer(app);


require('./config/express')(app);
require('./routes')(app);

// Socket.io Communication
io.sockets.on('connection', require('./config/socketio'));

//Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});



// Expose app
exports = module.exports = app;
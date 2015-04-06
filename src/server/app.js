/**
 * Express Server
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    db = require('./config/mongoose'),
    chalk = require('chalk'),
    socketio = require('socket.io'),
    config = require('./config/environment');

// Expose App
var app = express();
exports = module.exports = app;

var fs = require('fs');
var server = require('http').createServer(app);
var socket = require('socket.io')(server, {serveClient: true, path: '/socket.io-client'});

require('./config/express')(app);
require('./routes')(app);
require('./config/socketio')(socket);

server.listen(config.port, config.ip, function() {
    console.log(chalk.yellow('Express is running on love',
        config.port, app.get('env')));
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

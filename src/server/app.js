'use strict';

// Default NODE_ENV to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var debug    = require('debug')('tsg:express'),
  express  = require('express'),
  mongoose = require('mongoose'),
  chalk    = require('chalk'),
  config   = require('./config/environment'),
  fs       = require('fs');

// MongoDB
mongoose.connect(config.mongo.uri);
var db = mongoose.connection;

var app = express();
config.app = app;

var server = require('http').Server(app);
//var secureServer = require('https').createServer(httpsCfg, app);
var socketio = require('socket.io').listen(server);
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start the server
server.listen(config.port, config.ip, function () {
  console.log(chalk.yellow('Express is running on love',
    config.port, app.get('env')));
});
db.on('error', function () {
  console.error(chalk.red('MongoDB Connection Error. Please make sure that',
    config.mongo.uri, 'is running.'));
});

db.once('open', function callback() {
  console.info(chalk.green('Connected to MongoDB:', config.mongo.uri));
});

// Expose App
module.exports = app;

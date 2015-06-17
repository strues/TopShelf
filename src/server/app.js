import express from 'express';
import mongoose from 'mongoose';
import chalk from 'chalk';
import fs from 'fs';

// Default NODE_ENV to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (typeof Promise === 'undefined') {
  require('babel/polyfill');
}

var debug    = require('debug')('tsg:express'),
    config   = require('./config/environment');

// MongoDB
mongoose.connect(config.mongo.uri);
const db = mongoose.connection;

let app = express();

var server = require('http').createServer(app),
    socketio = require('socket.io').listen(server);
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start the server
server.listen(config.port, config.ip, function () {
  console.log(chalk.yellow('Express is running on love',
    config.port, app.get('env')));

  db.on('error', function () {
    console.error(chalk.red('MongoDB Connection Error. Please make sure that',
      config.mongo.uri, 'is running.'));
  });

  db.once('open', function callback() {
    console.info(chalk.green('Connected to MongoDB:', config.mongo.uri));
  });
});

export default app;

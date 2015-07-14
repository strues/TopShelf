import chalk from 'chalk';
import express from 'express';
import mongoose from 'mongoose';

// Default NODE_ENV to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (typeof Promise === 'undefined') {
  require('babel/polyfill');
}

const config = require('./config/environment');
// MongoDB
mongoose.connect(config.mongo.uri);
const db = mongoose.connection;

const app = module.exports = express(); // export app for testing ;)
const server = require('http').Server(app);
const io = require('socket.io')(server);

require('./config/socketio')(io);
require('./config/express')(app);
require('./init')(); // Create dummy data on startup uncomment for true
require('./routes')(app);

server.listen(config.port, config.ip, function() {
  console.log(chalk.yellow('Express is running on love',
    config.port, app.get('env')));

  db.on('error', function() {
    console.error(chalk.red('MongoDB Connection Error. Please make sure that',
      config.mongo.uri, 'is running.'));
  });

  db.once('open', function callback() {
    console.info(chalk.green('Connected to MongoDB:', config.mongo.uri));
  });
  if (process.env.NODE_ENV === 'secure') {
    console.log(chalk.green('HTTPs:\t\t\t\ton'));
  }
});

export default app;

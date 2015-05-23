/**
 * Connect to the database and add connection handlers
 * @module {MongooseConnection} config:mongoose
 * @requires {@link config}
 */
'use strict';

var mongoose     = require('mongoose'),
    chalk        = require('chalk'),
    debug        = require('debug')('app:mongoose:' + process.pid),
    config       = require('./environment');

// connect to mongodb
var connection = mongoose.connect(config.mongo.uri, config.mongo.options);

/**
 * The initialized Mongoose connection object
 * @type {MongooseConnection}
 */
module.exports = connection;

// reconnect if connection is disconnected or disconnecting
// throw any errors that occur while reconnecting
if (connection.state === 0 || connection.state === 3) {
  connection.open(function connectionReconnect(err) {
    if (err) {
      debug(chalk.red(
        'Error while reinitializing the database connection: %s', err));
      throw err; // throw error to stop application launch
    }
    debug(chalk.green('Database Connection reopened'));
  });
}

// register global database error handler
mongoose.connection.on('error', function connectionError(err) {
  debug(chalk.red('Database Error: ', err));
});

// register the connection handler once only
mongoose.connection.once('open', function connectionOpen() {
  debug(chalk.green('Database connection open'));

  // Populate DB with sample data
  if (config.seedDB) {
    require('./seed');
  }
});

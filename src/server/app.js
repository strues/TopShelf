'use strict';
/**
 * Express Server
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var debug  = require('debug')('tsg'),
  express  = require('express'),
  mongoose = require('mongoose'),
  chalk    = require('chalk'),
  config   = require('./config/environment'),
  fs       = require('fs');

// Expose App
var app = module.exports = express(); // export app for testing ;)
var server = require('http').Server(app);

mongoose.connect(config.mongo.url);
var db = mongoose.connection;

db.on('error', function() {
  console.error(chalk.red('MongoDB Connection Error.' +
    'Please make sure that', config.mongo.url, 'is running.'));
});

db.once('open', function callback() {
  console.info(chalk.green('Connected to MongoDB:', config.mongo.url));
});

require('./config/express')(app);
require('./routes')(app);

var httpsCfg = {
  key: fs.readFileSync('./server.key', 'utf8'),
  cert: fs.readFileSync('./server.crt', 'utf8')
};

var secureServer = require('https').createServer(httpsCfg, app);

server.listen(config.port, config.ip, function() {
  console.log(chalk.yellow('Express is running on love',
    config.port, app.get('env')));
});

secureServer.listen(8443, config.ip, function() {
  console.log(chalk.yellow('Express is running on love',
    '8443', app.get('env')));
});

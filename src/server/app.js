/**
 * Express Server
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    debug   = require('debug')('app:' + process.pid),
    db      = require('./config/mongoose'),
    chalk   = require('chalk'),
    config  = require('./config/environment');

// Expose App
var app = express();

var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function() {
  debug(chalk.yellow('Express is running on love',
      config.port, app.get('env')));
});

process.on('uncaughtException', function(err) {
  debug(err);
});

exports = module.exports = app;

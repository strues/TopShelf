/**
 * Express Server
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    db      = require('./config/mongoose'),
    chalk   = require('chalk'),
    config  = require('./config/environment');

// Expose App
var app = express();
var fs = require('fs');
var key         = fs.readFileSync('./server.key', 'utf8');
var cert        = fs.readFileSync('./server.crt', 'utf8');
var credentials = {
  key: key,
  cert: cert
};

var server = require('http').createServer(app);
var https = require('https').createServer(credentials, app);

require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function() {
  console.log(chalk.yellow('Express is running on love',
      config.port, app.get('env')));
});
https.listen('8443', config.ip, function() {
  console.log(chalk.blue('Express is running in SSL'))
});
process.on('uncaughtException', function(err) {
  console.log(err);
});

exports = module.exports = app;

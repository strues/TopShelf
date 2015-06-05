/**
 * Express Server
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var debug   = require('debug')('tsg'),
    express = require('express'),
    db      = require('./config/mongoose'),
    chalk   = require('chalk'),
    config  = require('./config/environment'),
    fs      = require('fs');

var httpsCfg = {
  key: fs.readFileSync('./server.key', 'utf8'),
  cert: fs.readFileSync('./server.crt', 'utf8')
};

// Expose App
var app = express();

var server = require('http').createServer(app);
var secureServer = require('https').createServer(httpsCfg, app);

require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function() {
  console.log(chalk.yellow('Express is running on love',
      config.port, app.get('env')));
});

secureServer.listen(8443, config.ip, function() {
  console.log(chalk.yellow('Express is running on love',
      '8443', app.get('env')));
});

exports = module.exports = app;

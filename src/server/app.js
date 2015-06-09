'use strict';

// Default NODE_ENV to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var debug = require('debug')('tsg'),
  express = require('express'),
  mongoose = require('mongoose'),
  chalk = require('chalk'),
  rq = require('./lib/rq'),
  semver = require('semver'),
  Guild = require('./api/guild/guild.model'),
  config = require('./config/environment'),
  fs = require('fs');

// MongoDB
mongoose.connect(config.mongo.url);
var db = mongoose.connection;

var httpsCfg = {
  key: fs.readFileSync('./server.key', 'utf8'),
  cert: fs.readFileSync('./server.crt', 'utf8')
};

var app = express();
config.app = app;

var server = require('http').Server(app);
var secureServer = require('https').createServer(httpsCfg, app);
var socketio = require('socket.io').listen(server);
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

db.on('error', function() {
  console.error(chalk.red('MongoDB Connection Error. Please make sure that',
    config.mongo.url, 'is running.'));
});

db.on('open', function () {
  debug(chalk.green('Mongodb ' + 'connected!'));

  // Start the server
  server.listen(config.port, config.ip, function() {
  // Test for correct node version as spec'ed in package.info
  if (!semver.satisfies(process.versions.node, config.engine)) {
    debug('Error: unsupported version of Node or io.js!'.red.bold);
    debug(chalk.red(' needs Node or io.js version '));
    process.exit(0);
  }

  // Log how we are running
  debug(chalk.green('listening on port ' + app.get('port').toString()));
  debug(chalk.green('listening in ' + app.settings.env.green.bold + ' mode.'));
  debug(chalk.green('Ctrl+C' + ' to shut down. ;)'));

  // Exit cleanly on Ctrl+C
  process.on('SIGINT', function() {
    socketio.close(); // close socket.io
    console.log('\n');
    debug(chalk.green('has ' + 'shutdown'));
    debug('was running for ' + Math.round(process.uptime()).toString().green
      .bold +
      ' seconds.');
    process.exit(0);
  });
});
});

var connectedCount = 0;

socketio.on('connection', function (socket) {
  connectedCount += 1;
  // Listen for pageview messages from clients
  socket.on('pageview', function (message) {
    var ip = socket.handshake.headers['x-forwarded-for'] ||
    socket.client.conn.remoteAddress || socket.handshake.address;
    var url = message;
    // Broadcast dashboard update (to all clients in default namespace)
    socketio.emit('dashUpdate', {
      connections: connectedCount,
      ip: ip,
      url: url,
      timestamp: new Date()
    });
  });
  // Update dashboard connections on disconnect events
  socket.on('disconnect', function () {
    connectedCount -= 1;
    socketio.emit('dashUpdate', {
      connections: connectedCount
    });
  });
});

// Expose App
exports = module.exports = app;

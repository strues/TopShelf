'use strict';

// Default NODE_ENV to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var debug = require('debug')('tsg'),
  express = require('express'),
  mongoose = require('mongoose'),
  chalk = require('chalk'),
  rq = require('./lib/rq'),
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

// Start the server
server.listen(config.port, config.ip, function () {
  console.log(chalk.yellow('Express is running on love',
    config.port, app.get('env')));
});

// Start the https server
secureServer.listen(8443, config.ip, function () {
  console.log(chalk.yellow('Express is running on love',
    '8443', app.get('env')));

  /*
   * TODO: Move this from here to somewhere better.
   */
  Guild.findOne({}, function (err, guild) {
    rq.bnet(
      'us.battle.net',
      '/api/wow/guild/' + config.realm + '/' + encodeURIComponent(
        config.guild) + '?fields=members,news',
      function (data) {
        var lastUpdated = new Date().getTime();
        if (guild !== null) {
          for (var key in data) {
            guild[key] = data[key];
          }

          guild.lastUpdated = lastUpdated;
          guild.news = data.news;
          guild.settings = {
            webAdminBattletag: ''
          };

          guild.save(function (err) {
            if (err) {
              throw err;
            }
          });
        }
        else {
          var newGuild = new Guild();
          for (var key in data) { // jshint ignore:line
            newGuild[key] = data[key];
          }

          newGuild.lastUpdated = lastUpdated;
          newGuild.settings = {
            webAdminBattletag: ''
          };

          newGuild.save(function (err) {
            if (err) {
              throw err;
            }
          });
        }
      }
    );
  });
});

db.on('error', function () {
  console.error(chalk.red('MongoDB Connection Error. Please make sure that',
    config.mongo.url, 'is running.'));
});

db.once('open', function callback () {
  console.info(chalk.green('Connected to MongoDB:', config.mongo.url));
});

// Expose App
exports = module.exports = app;

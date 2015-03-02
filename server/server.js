/**
 * Express Server
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    config = require('./config/environment');

// Establish MongoDB connection
var db = mongoose.connect(config.mongo.uri, config.mongo.options, function(err) {
    if (err) {
        console.error(chalk.red('Rekt, connection failed to: ' + config.mongo.uri));
        console.log(chalk.red(err));
    } else {
        console.log(chalk.green('Connection successful to: ' + config.mongo.uri));
    }
});
// If error, tell us more about error and end
mongoose.connection.on('error', function(err) {
    console.error(chalk.red('MongoDB connection error: ' + err));
    process.exit(-1);
});
// Setup server
var app = express();
var fs = require('fs');
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

var request = require('./request');
var Roster = require('./api/roster/roster.model');
server.listen(config.port, config.ip, function() {
    console.log('Express is running on %d, in %s mode',
        config.port, app.get('env'));
    Roster.findOne({}, function(err, roster) {
        request.bnet(
            'us.battle.net',
            '/api/wow/guild/sargeras' + '/' + encodeURIComponent(config.guild) + '?fields=members,admin-news',
            function(data) {
                var lastUpdated = new Date().getTime();
                if (roster !== null) {
                    for (var key in data) {
                        roster[key] = data[key];
                    }
                    roster.lastUpdated = lastUpdated;
                    roster.news = data.news;

                    roster.save(function(err) {
                        if (err) throw err;
                    });
                } else {
                    var newRoster = new Roster();
                    for (var key in data) {
                        newRoster[key] = data[key];
                    }
                    newRoster.lastUpdated = lastUpdated;
                    newRoster.save(function(err) {
                        if (err) throw err;
                    });
                }
            }
        );
    });
});

exports = module.exports = app;

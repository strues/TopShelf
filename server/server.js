/**
 * Main Server File
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express     = require('express'),
    mongoose    = require('mongoose'),
    config      = require('./config/environment');

// Establish Mongo Connection
mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {
    if (err) {
        console.log('Rekt, connection failed to: ' + config.mongo.uri);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + config.mongo.uri);
    }
});

// Setup server
var app         = express();
var fs          = require('fs');
var https       = require('https');
var server      = require('http').createServer(app);
var Guild           = require('./api/roster/roster.model');

require('./config/express')(app);
require('./routes')(app);
var request = require('./request')

/*
 * Start the server
 */
// HTTPS server
// https.createServer(options, app).listen('8443', function() {
//     console.log('HTTPS Express server listening on port ' + '8443');
// });
server.listen(config.port, config.ip, function () {
    console.log('Express is running on %d, in %s mode',
    config.port, app.get('env'));

    Guild.findOne({}, function(err, guild) {
        request.bnet(
            'us.battle.net',
            '/api/wow/guild/' + config.realm + '/' + encodeURIComponent(config.guild) +
            '?fields=members',
            function(data) {
                var lastUpdated = new Date().getTime();
                if (guild !== null) {
                    for (var key in data) {
                        guild[key] = data[key];
                    }

                    guild.lastUpdated = lastUpdated;
                    guild.settings = {
                        webAdminBattletag: ''
                    };

                    guild.save(function(err) {
                        if (err) throw err;
                    });
                }
                else {
                    var newGuild = new Guild();
                    for (var key in data) {
                        newGuild[key] = data[key];
                    }

                    newGuild.lastUpdated = lastUpdated;
                    newGuild.settings = {
                        webAdminBattletag: ''
                    };

                    newGuild.save(function(err) {
                        if (err) throw err;
                    });
                }
            }
        );
    });
});

exports = module.exports = app;

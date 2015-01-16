/**
 * Main application file
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express     = require('express'),
    mongoose    = require('mongoose'),
    config      = require('./config/environment');

var battle = require('./battle');
var Guild = require('./api/guild/guild.model');

// var https      = require('https'),
// fs         = require('fs'),
// keyFile  = './server/config/keys/key.pem',
// certFile  = './server/config/keys/cert.pem';
// var ssl     = {
//   key: fs.readFileSync(keyFile),
//  cert: fs.readFileSync(certFile)
// };

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {
    if (err) {
        console.log('Connection refused to ' + config.mongo.uri);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + config.mongo.uri);
    }
});

// Setup server
var app         = express();
var server      = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);
//require('./battle')(app);

/*
 * Start the server
 */
//https.createServer(ssl, app).listen(8443);
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode',
    config.port, app.get('env'));
    Guild.findOne({}, function(err, guild) {
        battle.bnet(
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
                        if(err) throw err;
                    });
                }
            }
        );
    });
});

exports = module.exports = app;

/**
 * Main Server File
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express     = require('express'),
    mongoose    = require('mongoose'),
    chalk       = require('chalk'),
    config      = require('./config/environment');

// Establish Mongo Connection
var db = mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {
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
var app         = express();
var fs          = require('fs');
var https       = require('https');
var server      = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);
var request = require('./request')

var options = {
key: fs.readFileSync('./server.key'),
cert: fs.readFileSync('./server.crt')
};

/*
 * Start the server
 */
// HTTPS server
 https.createServer(options, app).listen('8443', function() {
     console.log('HTTPS Express server listening on port ' + '8443');
 });
server.listen(config.port, config.ip, function () {
    console.log('Express is running on %d, in %s mode',
    config.port, app.get('env'));
});

exports = module.exports = app;

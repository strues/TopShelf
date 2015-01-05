/**
 * Main application file
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express     = require('express'),
    mongoose    = require('mongoose'),
    config      = require('./config/environment');

var https      = require('https'),
fs         = require('fs'),
keyFile  = './server/config/keys/key.pem',
certFile  = './server/config/keys/cert.pem';
var ssl     = {
  key: fs.readFileSync(keyFile),
 cert: fs.readFileSync(certFile)
};

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

// var socket    = require('socket.io')(server, {
//     serveClient: (config.env !== 'production'),
//     path: '/socket.io-client'
//   });

//require('./config/socketio')(socket);
require('./config/express')(app);
require('./routes')(app);
//require('./battle')(app);

/*
 * Start the server
 */
https.createServer(ssl, app).listen(8443);
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode',
    config.port, app.get('env'));
});

exports = module.exports = app;

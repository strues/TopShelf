/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express     = require('express'),
    mongoose    = require('mongoose'),
    config      = require('./config/environment');


// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

/*
 * Disable these in production and replace with new values.
	 	var https       = require('https');
	 	var fs = require('fs');
		var pkey        = fs.readFileSync('./server/config/keys/key.pem');
		var pcert       = fs.readFileSync('./server/config/keys/cert.pem');
		var credentials = {key: pkey, cert: pcert};
 *
 */

if(config.seedDB) { require('./config/seed'); }

// Setup server
var app         = express();
var server      = require('http').createServer(app);
var socketio    = require('socket.io')(server, {
    serveClient: (config.env !== 'production'),
    path: '/socket.io-client'
  });

require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);
//require('./battle')(app);


app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// error handling
app.use(function(err, req, res, next) {
  res.status(500).body({ message: err.message });
});



/*
 * Start the server
 */
//var httpsServer = https.createServer(credentials, app);
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode',
    config.port, app.get('env'));
});
// Expose app
//httpsServer.listen(8443); // Disable unless testing oauth

exports = module.exports = app;

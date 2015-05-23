/**
 * Express Configuration
 */

'use strict';

var express        = require('express'),
    logger         = require('./logger'),
    config         = require('./environment'),
    favicon        = require('serve-favicon'),
    morgan         = require('morgan'),
    Redis          = require('ioredis'),
    compression    = require('compression'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser   = require('cookie-parser'),
    errorHandler   = require('errorhandler'),
    path           = require('path'),
    multer         = require('multer'),
    busboy         = require('connect-busboy'),
    session        = require('express-session'),
    mongoose       = require('mongoose'),
    RedisStore     = require('connect-redis')(session),
    flash          = require('connect-flash');

module.exports = function(app) {
  var env = app.get('env');
  // Showing stack errors
  app.set('showStackError', true);

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');


  // Enable logger (morgan)
  app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride('X-HTTP-Method-Override'));
  // Enable jsonp
  app.enable('jsonp callback');

  app.use(cookieParser());
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    prefix: 'sess',
    saveUninitialized: true,
    store: new RedisStore({
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      family: 4,           // 4(IPv4) or 6(IPv6)
      db: 0})
  }));

  // connect flash for flash messages
  app.use(flash());
  // busboy to handle file uploading
  app.use(busboy());

  app.set('appPath', path.join(config.root, 'client'));
  // Should be placed before express.static
  app.use(compression({
    // only compress files for the following content types
    filter: function(req, res) {
      return (/json|text|javascript|css/)
      .test(res.getHeader('Content-Type'));
    },
    // zlib option for compression level
    level: 6
  }));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client',
      'assets/favicon.ico')));
    app.use(express.static(app.get('appPath')));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};

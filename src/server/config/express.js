/**
 * Express Configuration
 */

'use strict';
var debug = require('debug')('tsg:express');
var express = require('express'),
    favicon        = require('serve-favicon'),
    dexter         = require('morgan'),
    compression    = require('compression'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    passport       = require('passport'),
    path           = require('path'),
    csrf           = require('csurf'),
    helmet         = require('helmet'),
    cors           = require('cors'),
    logger         = require('./logger'),
    config         = require('./environment'),
    multer         = require('multer'),
    session        = require('express-session'),
    busboy         = require('connect-busboy'),
    mongoose       = require('mongoose'),
    mongoStore     = require('connect-mongo')(session);

module.exports = function (app) {

  var env = app.get('env');

  // Enable logger (morgan)
  app.use(dexter(logger.getLogFormat(), logger.getLogOptions()));

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  // always bodyParser before cookie, method or session
  // parse application/x-www-form-urlencoded

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cors({credentials: true, origin: true}));
  // parse application/json

  app.use(methodOverride());
  app.enable('jsonp callback');

  app.set('appPath', path.join(config.root, 'client'));
  app.use(busboy());

  app.use(session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  }));

  // Security Settings
  app.disable('x-powered-by');          // Don't advertise our server type
  app.use(csrf());                      // Prevent Cross-Site Request Forgery
  app.use(helmet.ienoopen());           // X-Download-Options for IE8+
  app.use(helmet.nosniff());            // Sets X-Content-Type-Options to nosniff
  app.use(helmet.xssFilter());          // sets the X-XSS-Protection header
  app.use(helmet.frameguard('deny'));   // Prevent iframe clickjacking

  // Passport OAUTH Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Keep user, csrf token and config available
  app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.config = config;
    res.locals._csrf = req.csrfToken();
    next();
  });

  // time in milliseconds...
  var minute = 1000 * 60;   //     60000
  var hour = (minute * 60); //   3600000
  var day  = (hour * 24);   //  86400000
  var week = (day * 7);     // 604800000

  if ('production' === env) {
    app.use(compression());
    app.enable('trust proxy', 1);
    var ninetyDaysInMilliseconds = 7776000000;
    app.use(helmet.hsts({maxAge: ninetyDaysInMilliseconds}));
    app.set('etag', true);
    // Turn on HTTPS/SSL cookies
    config.session.proxy = true;
    config.session.cookie.secure = true;
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath'), {maxAge: week}));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    app.use(errorHandler()); // Error handler - has to be last
  }
  // Production 500 error handler (no stacktraces leaked to public!)
  if (app.get('env') === 'production') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      debug('Error: ' + (err.status || 500).toString().red.bold + ' ' + err);
    });
  }
};

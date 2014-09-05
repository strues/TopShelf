/**
 * Express configuration
 */

'use strict';

var express        = require('express'),
    favicon        = require('serve-favicon'),
    morgan         = require('morgan'),
    colors         = require('colors'),
    compression    = require('compression'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser   = require('cookie-parser'),
    errorHandler   = require('errorhandler'),
    path           = require('path'),
    config         = require('./environment'),
    passport       = require('passport'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    mongoose       = require('mongoose'),
    config         = require('./environment');

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // Persist sessions with Redis
  // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({
          host: '127.0.0.1',
          port: '6379'
    })
  }));
  
  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('appPath', config.root + '/public');
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, 'build')));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
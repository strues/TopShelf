/**
 * Express Configuration
 */

'use strict';
var debug = require('debug')('tsg:express');
var express        = require('express'),
    favicon        = require('serve-favicon'),
    dexter         = require('morgan'),
    compression    = require('compression'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    passport       = require('passport'),
    path           = require('path'),
    cors           = require('cors'),
    logger         = require('./logger'),
    config         = require('./environment'),
    multer         = require('multer'),
    expressSession = require('express-session'),
    RedisStore     = require('connect-redis')(expressSession),
    busboy         = require('connect-busboy'),
    mongoose       = require('mongoose');

module.exports = function (app) {

  var env = app.get('env');
  require('../lib/redis');
  // Enable logger (morgan)
  app.use(dexter(logger.getLogFormat(), logger.getLogOptions()));

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

 /**
   * @name TopShelf#sessionStorage
   * @description
   * Connect-compatible {@link https://www.npmjs.org/package/connect-redis | redis sessions` storage } used by
   * {@link TopShelf#express Express application } and {@link TopShelf#io  Socket.io server }
   */
  var sessionStorage = new RedisStore({
    prefix: 'shelf_session_',
    client: app.redisClient
  })

  // always bodyParser before cookie, method or session
  // parse application/x-www-form-urlencoded

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cors());
  // parse application/json

  app.use(methodOverride());
  app.enable('jsonp callback');

  app.set('appPath', path.join(config.root, 'client'));
  app.use(busboy());

  app.use(expressSession({
    key: 'tsg.sid',
    secret: config.session.secret,
    store: sessionStorage,
    expireAfterSeconds: parseInt(config.session.expireAfterSeconds, 10) || 180,
    httpOnly: true,
    resave: true,
    saveUninitialized: true
  }));

  // Security Settings
  app.disable('x-powered-by');
  app.enable('trust proxy');
  // Passport OAUTH Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // time in milliseconds...
  var minute = 1000 * 60;   //     60000
  var hour = (minute * 60); //   3600000
  var day  = (hour * 24);   //  86400000
  var week = (day * 7);     // 604800000

  if ('production' === env) {
    app.use(compression());
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath'), {maxAge: week}));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};

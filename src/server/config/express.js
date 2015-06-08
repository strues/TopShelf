/**
 * Express Configuration
 */

'use strict';
var debug = require('debug')('tsg:express');
var express = require('express'),
  favicon = require('serve-favicon'),
  dexter = require('morgan'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  errorHandler = require('errorhandler'),
  passport = require('passport'),
  path = require('path'),
  cors = require('cors'),
  logger = require('./logger'),
  config = require('./environment'),
  multer = require('multer'),
  session = require('express-session'),
  busboy = require('connect-busboy'),
  mongoose = require('mongoose'),
  mongoStore = require('connect-mongo')(session);

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

  // parse application/json

  app.use(methodOverride('X-HTTP-Method-Override'));
  app.enable('jsonp callback');
  app.use(cookieParser());
  app.set('appPath', path.join(config.root, 'client'));
  app.use(busboy());
  app.use(passport.initialize());

  app.use(session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  }));

  app.use(function(req, res, next) {
    debug('I am adding the allow origin');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  if ('production' === env) {
    app.use(compression());
    app.use(favicon(path.join(config.root, 'client', 'assets/favicon.ico')));
    app.use(express.static(app.get('appPath')));
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};

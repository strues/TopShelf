/**
 * Express Configuration
 */

'use strict';

var express        = require('express'),
    debug          = require('debug')('app:express' + process.pid),
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
    genuuid        = require('./uuid'),
    RedisStore     = require('connect-redis')(session),
    flash          = require('connect-flash');

module.exports = function(app) {
  var env = app.get('env');
  // Showing stack errors
  app.set('showStackError', true);

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  var redisClient = new Redis();
  // Enable logger (morgan)
  app.use(morgan('dev'));

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride('X-HTTP-Method-Override'));
  // Enable jsonp
  app.enable('jsonp callback');
  debug('Setup session with Redis');
  app.use(cookieParser());
  app.use(session({
      key: 'topk3k',
      saveUninitialized: true,
      resave: true,
      prefix: 'sess:',
      secret: 'kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig',
      store: new RedisStore({ host: '127.0.0.1', port: 6379, client: redisClient })
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

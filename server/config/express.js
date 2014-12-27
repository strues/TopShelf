/**
 * Express configuration
 */

'use strict';

var express        = require('express'),
    favicon        = require('serve-favicon'),
    morgan         = require('morgan'),
    compression    = require('compression'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser   = require('cookie-parser'),
    errorHandler   = require('errorhandler'),
    path           = require('path'),
    cors           = require('cors'),
    config         = require('./environment'),
    redis          = require('redis'),
    passport       = require('passport'),
    session        = require('express-session'),
    redisStore     = require('connect-redis')(session),
    flash          = require('express-flash');


module.exports = function(app) {
  var client = redis.createClient(); // Redis
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(bodyParser.urlencoded({ extended: 'true' })); // parse application/x-www-form-urlencoded

  app.use(methodOverride('X-HTTP-Method-Override'));



  // Enable jsonp
  app.enable('jsonp callback');
  app.use(session(
  {
    secret: config.secrets.session,
    store: new redisStore({ host: 'localhost', port: 6379, client: client }),
    saveUninitialized: false, // don't create session until something stored,
    resave: false // don't save session if unmodified
  }
));
  app.use(cors());
  app.use(cookieParser());
  app.use(passport.initialize());

  app.use(flash());

  app.set('appPath', path.join(config.root, 'client'));



  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client', 'assets/favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};

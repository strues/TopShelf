/**
 * Express Configuration
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
    logger         = require('./logger'),
    config         = require('./environment'),
    redis          = require('redis'),
    passport       = require('passport'),
    session        = require('express-session'),
    redisStore     = require('connect-redis')(session),
    flash          = require('express-flash');


module.exports = function(app) {
    var client = redis.createClient(); // Redis
    var env = app.get('env');

  // Should be placed before express.static
    app.use(compression({
      // only compress files for the following content types
      filter: function(req, res) {
          return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
      },
      // zlib option for compression level
      level: 3
    }));
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
    app.use(cors());
    app.use(cookieParser());
  // Enable jsonp
    app.use(session({
      secret: config.secrets.session,
      saveUninitialized: false, // don't news.create session until something stored,
      resave: true, // don't save session if unmodified
      store: new redisStore({
          host: 'localhost',
          port: 6379,
          client: client
      }),
      cookie: config.sessionCookie,
      name: config.sessionName
    }));

    app.use(passport.initialize());
    app.use(passport.session());

  // connect flash for flash messages
    app.use(flash());

    app.set('appPath', path.join(config.root, 'client'));

    if ('production' === env) {
        app.use(favicon(path.join(config.root, 'client', 'assets/favicon.ico')));
        app.use(express.static(app.get('appPath')));
    }

    if ('development' === env || 'test' === env) {
        app.use(express.static('./client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};

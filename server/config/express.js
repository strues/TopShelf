/**
 * Express configuration
 */

'use strict';

var express        = require('express');
var favicon        = require('serve-favicon');
var morgan         = require('morgan');
var compression    = require('compression');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var errorHandler   = require('errorhandler');
var path           = require('path');
var config         = require('./environment');
var passport       = require('passport');
var session        = require('express-session');
var mongoStore     = require('connect-mongo')(session);
var mongoose       = require('mongoose');

module.exports = function(app) {
  var env = app.get('env');

//   app.all('*', function(req, res, next) {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Credentials', true);
//   res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
//   res.set('Access-Control-Allow-Headers',
//     'X-Requested-With, Content-Type, Authorization');
//   if ('OPTIONS' === req.method) {
//     return res.send(200);
//     }
//   next();
// });


  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // Persist sessions with mongoStore
  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongoose_connection: mongoose.connection })
  }));

  app.set('appPath', path.join(config.root, 'client'));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
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

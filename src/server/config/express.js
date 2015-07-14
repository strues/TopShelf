/**
 * Express Configuration
 */

import bodyParser from 'body-parser';
import compression from 'compression';
import busboy from 'connect-busboy';
import cors from 'cors';
import errorHandler from 'errorhandler';
import cookieParser from 'cookie-parser';
import express from 'express';
import expressSession from 'express-session';
import methodOverride from 'method-override';
import morgan from 'morgan';
import passport from 'passport';
import {join} from 'path';
import favicon from 'serve-favicon';
import * as config from './environment';
import logger from './logger';
import redis from 'connect-redis';
import flash from 'connect-flash';
let dexter = morgan;

const requestLogger = require('../lib/logger/requestLogger'),
      responseLogger = require('../lib/logger/responseLogger');
export default (app) => {

  let env = app.get('env');
  // Enable logger (morgan)
  //app.use(dexter(logger.getLogFormat(), logger.getLogOptions()));

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(requestLogger); /* log all requests and responses */
  app.use(responseLogger);
 /**
   * @name TopShelf#sessionStorage
   * @description
   * Connect-compatible {@link https://www.npmjs.org/package/connect-redis | redis sessions` storage } used by
   * {@link TopShelf#express Express application } and {@link TopShelf#io  Socket.io server }
   */

  const sessionMiddleware = new (redis(expressSession))({
    host: 'localhost',
    port: 6379
  });

  // always bodyParser before cookie, method or session
  // parse application/x-www-form-urlencoded

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser(config.session.secret));
  app.use(cors());
  // parse application/json

  app.use(methodOverride());
  app.enable('jsonp callback');

  app.set('appPath', join(config.root, 'client'));
  app.use(busboy());

  app.use(expressSession({
    store: sessionMiddleware,
    key: 'tsg.sid',
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 7 * 24 * 60 * 60 * 1000}
    }));

  // Passport OAUTH Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept');
  // If someone calls with method OPTIONS, let's display the allowed methods on our API
  if (req.method === 'OPTIONS') {
    res.status(200);
    res.write("Allow: GET,PUT,POST,DELETE,OPTIONS");
    res.end();
  } else {
    next();
  }
});

  // time in milliseconds...
  const minute = 1000 * 60;   //     60000
  const hour = (minute * 60); //   3600000
  const day = (hour * 24);   //  86400000
  const week = (day * 7);     // 604800000

  app.use(flash());
  // Security Settings
  app.disable('x-powered-by');
  app.enable('trust proxy');

  if (env === 'production') {
    app.use(compression());
    app.use(favicon(join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath'), {maxAge: week}));
  }

  if (env === 'development' || env === 'test') {
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};

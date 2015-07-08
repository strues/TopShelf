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
import { join } from 'path';
import favicon from 'serve-favicon';
import config from './environment';
import logger from './logger';

let dexter = morgan;

let RedisStore = require('connect-redis')(expressSession);

export default (app) => {

  let env = app.get('env');
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
    key: 'tsg.sid',
    secret: config.session.secret,
    store: sessionStorage,
    expireAfterSeconds: parseInt(config.session.expireAfterSeconds, 10) || 180,
    resave: false,
    saveUninitialized: true
  }));

  // Security Settings
  app.disable('x-powered-by');
  app.enable('trust proxy');
  // Passport OAUTH Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // time in milliseconds...
  const minute = 1000 * 60;   //     60000
  const hour = (minute * 60); //   3600000
  const day  = (hour * 24);   //  86400000
  const week = (day * 7);     // 604800000

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

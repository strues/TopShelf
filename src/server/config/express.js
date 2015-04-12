/**
 * Express Configuration
 */

'use strict';

var express = require('express'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    cors = require('cors'),
    multer = require('multer'),
    logger = require('./logger'),
    config = require('./environment'),
    busboy = require('connect-busboy'),
    passport = require('passport'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    mongoStore = require('connect-mongo')(session),
    flash = require('connect-flash');

module.exports = function(app) {
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
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });
    app.use(cookieParser());
    // Enable jsonp
    app.use(session({
        secret: config.secrets.session,
        resave: true,
        saveUninitialized: true,
        store: new mongoStore({mongooseConnection: mongoose.connection})
    }));
    app.use(busboy());

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
        app.use(express.static('./src/client/'));
        app.use(express.static('./'));
        app.use(express.static('./tmp'));
        app.use(errorHandler()); // Error handler - has to be last
    }
};

'use strict';

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    config = require('../gulp.config')(),
    path   = require('path'),
    _      = require('lodash'),
    $      = require('gulp-load-plugins')({lazy: true});

var karma = require('karma').server;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
});

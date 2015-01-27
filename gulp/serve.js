'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('../gulp.config')();
var path = require('path');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});

// watch files for changes and reload
gulp.task('serve', ['clean:sass', 'styles', 'nodemon'], function() {
  browserSync({
    proxy: 'http://localhost:9000',
    files: [
        config.client + '**/*',
        config.temp + '**/*.css',
        '!' + config.sass
    ],
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'topshelf',
    notify: true,
    reloadDelay: 0 //1000
  });

  gulp.watch([config.sass], ['styles']);
});

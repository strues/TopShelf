'use strict';

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    config = require('../gulp.config')(),
    path   = require('path'),
    chalk  = require('chalk'),
    nodemon = require('gulp-nodemon'),
    _      = require('lodash'),
    $      = require('gulp-load-plugins')({lazy: true});

gulp.task('nodemon', function () {
  nodemon({
      script: 'server/server.js',
      ext: 'js',
      ignore: [
        'node_modules/**',
        'bower_components/**'
            ],
      env: {'NODE_ENV': 'development'}
    })
    .on('change', ['vet'])
    .on('restart', function () {
      console.log('restarted!')
    })
});

/**
 * Log. With options.
 *
 * @param {String} msg
 * @param {Object} options
 */
function log (msg, options) {
  options = options || {};
  console.log(
    (options.padding ? '\n' : '') +
    chalk.yellow(' > ' + msg) +
    (options.padding ? '\n' : '')
  );
}

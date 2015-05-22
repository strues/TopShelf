/**
 * Inject Task
 *
 * Inject css/js files in index.html
 */

'use strict';

var args         = require('yargs').argv;
var gulp         = require('gulp'),
    config       = require('../config')(),
    error        = require('../util/error'),
    es           = require('event-stream'),
    plg          = require('gulp-load-plugins')({lazy: true});// jshint ignore:line
var wiredep = require('wiredep').stream;

/**
 * Wire-up the project files
 * @return {Stream}
 */

gulp.task('inject', ['templatecache', 'sass'], function () {
    var injectStyles = gulp.src([
      config.tmp + '/**/*.css',
      '!' + config.tmp + '/vendor.css'
    ], {read: false});

    var injectScripts = gulp.src([
      config.client + '/app/app.module.js',
      config.client + '/app/app.config.js',
      config.client + '/app/**/*.module.js',
      config.client + '/app/**/*.config.js',
      config.client + '/**/*.js',
      '!' + config.client + '/**/*.spec.js'
    ]);

    var injectOptions = {
      ignorePath: [config.root],
      addRootSlash: false
    };

    return gulp.src(config.client + '/*.html')
      .pipe(plg.inject(injectStyles, injectOptions))
      .pipe(plg.inject(injectScripts, injectOptions))
      .pipe(wiredep(config.wiredep))
      .pipe(gulp.dest(config.client));

  });

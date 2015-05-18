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
      '{' + config.js,
      '!' + config.client + '/app/**/*.spec.js',
      '!' + config.client + '/app/**/*.mock.js'
    ])
    .pipe(plg.angularFilesort()).on('error', error);

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

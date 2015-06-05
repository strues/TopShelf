/**
 * Inject Task
 *
 * Inject css/js files in index.html
 */

'use strict';

var gulp         = require('gulp'),
    config       = require('../config')(),
    plg          = require('gulp-load-plugins')({
                            pattern: ['gulp-*', 'gulp.*'],
                            replaceString: /^gulp(-|\.)/,
                            camelize: true,
                            lazy: true});
var wiredep = require('wiredep').stream;

/**
 * Wire-up the project files
 * @return {Stream}
 */

gulp.task('inject', ['partials', 'sass'], function () {

  var injectStyles = gulp.src([config.temp + '**/*.css',
    '!' + config.temp + '/vendor.css'], {read: false});

  var injectScripts = gulp.src([
    config.ngApp + 'app.module.js',
    config.ngApp + '**/*.module.js',
    config.ngApp + '**/*.config.js',
    config.ngApp + '**/*.js',
    '!' + config.client + '/**/*.spec.js',
    '!' + config.client + '/**/*.mock.js'
  ]);
  var injectPartials = gulp.src([config.temp + 'partials.min.js']);
  var injectOptions = {
      ignorePath: '../..',
      addRootSlash: false
    };

  return gulp.src(config.index)
    .pipe(plg.inject(injectStyles, injectOptions))
    .pipe(plg.inject(injectPartials, injectOptions))
    .pipe(plg.inject(injectScripts, injectOptions))
    .pipe(wiredep(config.wiredep))
    .pipe(gulp.dest(config.client));
});

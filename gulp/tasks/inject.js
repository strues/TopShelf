/**
 * Inject Task
 *
 * Inject css/js files in index.html
 */

'use strict';

var gulp    = require('gulp'),
    config  = require('../config')(),
    wiredep = require('wiredep').stream,
    plg     = require('gulp-load-plugins')({
                pattern: ['gulp-*', 'gulp.*'],
                replaceString: /^gulp(-|\.)/,
                camelize: true,
                lazy: true});
/**
 * Wire-up the project files
 * @return {Stream}
 */

gulp.task('inject', ['bower', 'partials', 'sass'], function () {

  var injectStyles = gulp.src([config.temp + '**/*.css'], {read: false});

  var injectScripts = gulp.src(config.js);
  var injectPartials = gulp.src([config.temp + 'templates.js']);
  var injectOptions = {
      ignorePath: '../..',
      addRootSlash: true
    };

  return gulp.src(config.index)
    .pipe(plg.inject(injectStyles, injectOptions))
    .pipe(plg.inject(injectPartials, injectOptions))
    .pipe(plg.inject(injectScripts, injectOptions))
    .pipe(gulp.dest(config.client));
});

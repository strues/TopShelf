'use strict';

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    config       = require('../gulp.config')(),
    path         = require('path'),
        chalk  = require('chalk'),
    _            = require('lodash'),
    $            = require('gulp-load-plugins')({lazy: true});

gulp.task('templates', function () {

    return gulp
    .src(config.templates)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.temp))
    .pipe($.notify('angular templatecache compiled'));
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

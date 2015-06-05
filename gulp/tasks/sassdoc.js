/**
 * SassDoc task
 *
 * Generate Scss documentation using SassDoc
 */
'use strict';

var gulp = require('gulp'),
  config  = require('../config')(),
  sassdoc = require('sassdoc'),
  plg     = require('gulp-load-plugins')({lazy: true}); // jshint ignore:line

gulp.task('sassdoc', function() {
  return gulp
    .src(config.sass)
    .pipe(sassdoc({
      dest: 'doc/sass'
    }));
});

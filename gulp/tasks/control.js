/**
 * Control Tasks
 */

'use strict';

var gulp = require('gulp'),
    config = require('../config')(),
    es = require('event-stream'),
    rs = require('run-sequence'),
    taskListing = require('gulp-task-listing'),
    plg = require('gulp-load-plugins')({lazy: true});// jshint ignore:line

gulp.task('build', function(callback) {
  rs(
    'clean',
    'partials',
    'bower:build',
    'scripts:build',
    'sass:build',
    //'html:build',
    'optimize',
    'images',
    'fonts',
    callback);
});

gulp.task('vet', function(callback) {
  rs(
  'lint',
  'jscs',
  'eslint',
  'scsslint',
  callback);
});

gulp.task('serve', function(callback) {
  rs(
    'clean',
    'serve-dev',
    callback);
});

gulp.task('default', taskListing.withFilters(/:/));

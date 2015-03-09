'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({lazy: true});

require('require-dir')('./gulp', {recurse: true});

gulp.paths = {
  src: 'src/client',
  dist: 'build',
  tmp: '.tmp',
  e2e: 'e2e'
};

// Add a task to render the output
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

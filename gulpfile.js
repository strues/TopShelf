'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({lazy: true});
require('require-dir')('./gulp', {recurse: true});

// Add a task to render the output
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

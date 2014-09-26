'use strict';

var gulp = require('gulp'),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    size = require('gulp-size'),
    concat = require('gulp-concat');
/**
 * Copy all fonts included in bower_components & app/fonts and remove their relative paths
 */

gulp.task('fonts', function () {
  var fontsSRC = require('main-bower-files')().concat('client/assets/fonts/**/*');

  return gulp.src(fontsSRC)
    .pipe(filter('**/*.{eot,svg,ttf,woff}'))
    .pipe(flatten())
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe(size({title: 'fonts'}));
});
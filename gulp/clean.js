'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('../gulp.config')();
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'glob', 'del']
});

gulp.task('clean', function () {
  return $.del([config.temp, config.build])
  $.notify('Deleting temp and build folders');
});

gulp.task('clean:sass', function () {
  return $.del([config.temp])
  $.notify('Deleting temp folders');
});

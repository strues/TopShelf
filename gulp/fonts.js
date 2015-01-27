'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var nodemon = require('gulp-nodemon');
var config = require('../gulp.config')();
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'glob', 'del']
});

gulp.task('fonts', function() {

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.assets + 'fonts'))
        .pipe(gulp.dest(config.build + 'fonts'));
});

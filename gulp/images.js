'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('../gulp.config')();
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'glob', 'del']
});

gulp.task('images', function() {

    return gulp
        .src(config.images)
        .pipe($.changed(config.build + 'images'))
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});

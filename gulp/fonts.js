'use strict';

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    config = require('../gulp.config')(),
    path   = require('path'),
    _      = require('lodash'),
    $      = require('gulp-load-plugins')({lazy: true});

gulp.task('fonts', function() {

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.assets + 'fonts'))
        .pipe(gulp.dest(config.build + 'assets/fonts'));
});

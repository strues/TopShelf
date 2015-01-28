'use strict';

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    config = require('../gulp.config')(),
    path   = require('path'),
    _      = require('lodash'),
    $      = require('gulp-load-plugins')({lazy: true});

gulp.task('inject', ['wiredep', 'styles', 'templates'], function() {

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

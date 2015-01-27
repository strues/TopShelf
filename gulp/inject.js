'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('../gulp.config')();
var ngFS = require('gulp-angular-filesort');
var path = require('path');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('inject', ['wiredep', 'styles', 'templates'], function() {

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

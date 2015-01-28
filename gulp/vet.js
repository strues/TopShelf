'use strict';

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    config = require('../gulp.config')(),
    path   = require('path'),
    _      = require('lodash'),
    $      = require('gulp-load-plugins')({lazy: true});

gulp.task('vet', function () {

    return gulp
      .src(config.js)
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
     // .pipe($.jshint.reporter('fail'))
      .pipe($.jscs());
});

gulp.task('vet:nofail', function () {

    return gulp
      .src(config.js)
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
      .pipe($.jscs());
});

// generate a todo.md from your javascript files
gulp.task('todo', function() {
    gulp.src(config.js)
        .pipe($.todo())
        .pipe(gulp.dest('./'));
        // -> Will output a TODO.md with your todos
});

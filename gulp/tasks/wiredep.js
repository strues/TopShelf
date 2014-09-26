'use strict';

var gulp = require('gulp'),
    wiredep = require('wiredep');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src(['client/**/*.scss', '!client/bower_components/**/*'])
    .pipe(wiredep({
        directory: 'client/bower_components'
    }))
    .pipe(gulp.dest('client'));

  gulp.src('client/*.html')
    .pipe(wiredep({
      directory: 'client/bower_components',
      exclude: ['bootstrap-sass-official']
    }))
    .pipe(gulp.dest('client'));
});
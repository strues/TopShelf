'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('client/styles/*.scss')
    .pipe(wiredep({
        directory: 'client/bower_components'
    }))
    .pipe(gulp.dest('client/styles'));

  gulp.src('client/*.html')
    .pipe(wiredep({
      directory: 'client/bower_components',
      exclude: ['bootstrap-sass-official']
    }))
    .pipe(gulp.dest('client'));
});

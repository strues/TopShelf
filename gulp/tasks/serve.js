'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('serve', function () {
  runSequence(
    ['scripts', 'sass', 'watch'],
    'server:dev'
  );
});

gulp.task('serve:dist', function () {
  runSequence(
    'clean',
    ['scripts', 'sass'],
    'server:dist'
  );
});
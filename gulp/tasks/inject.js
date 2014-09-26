'use strict';

var gulp     = require('gulp'),
    inject   = require('gulp-inject'),
    size     = require('gulp-size');

/**
 * Automatically inject saved files in client/app/
 */
gulp.task('inject', function() {
  //var target = gulp.src('client/index.html');
  //var sources = 

  return gulp.src('./client/index.html')
    .pipe(inject(gulp.src(['./client/app/**/*.js'], {read: false}), {relative: true}))
    .pipe(gulp.dest('client'))
    .pipe(size({title: 'inject'}));
});
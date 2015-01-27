'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefixer = require('autoprefixer-core');
var config = require('../gulp.config')();
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'glob', 'del']
});

gulp.task('styles', function () {

  return gulp.src(config.sass)
    .pipe($.plumber())
    .pipe($.sass({
      sourceMap: 'sass',
      outputStyle: 'nested'
    }))
    .pipe($.postcss([autoprefixer({browsers: ['last 2 version']})]))
    .on('error', function handleError(err) {
          console.error(err.toString());
          this.emit('end');
      })
    .pipe(gulp.dest(config.temp));
});

gulp.task('sass-watcher', function() {
    gulp.watch([config.sass], ['styles']);
});

'use strict';
/*
 * @title Sass
 * @description A task to compile Sass to CSS
 * @example (cli) gulp sass
 */

var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    config       = require('../config')(),
    handleErrors = require('../util/error'),
    plg          = require('gulp-load-plugins')({
                      pattern: ['gulp-*', 'gulp.*'],
                      replaceString: /^gulp(-|\.)/,
                      camelize: true,
                      lazy: true});

/**
 * Compile Sass to css
 * @return {Stream}
 */
gulp.task('sass', function() {
  return gulp
    .src(config.sass)
    .pipe(plg.changed(config.temp))
    .pipe(plg.sassBulkImport())
    .pipe(plg.sass())
    .on('error', handleErrors)
    .pipe(plg.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
      ]))
    .pipe(gulp.dest(config.temp))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass:build', function() {
  return gulp
      .src(config.sass)
      .pipe(plg.changed(config.buildC + 'css/'))
      .pipe(plg.sassBulkImport())
      .pipe(plg.sass())
      .on('error', handleErrors)
      .pipe(plg.postcss([require('autoprefixer-core')({
        browsers: ['last 1 version']})
      ]))
      .pipe(plg.csso())
      .pipe(gulp.dest(config.buildC + 'css/'))
      .pipe(plg.size())
      .pipe(plg.notify({
        onLast: true,
        message: function() {
          return 'Total CSS size ' + plg.size().prettySize;
        }
      }));
});

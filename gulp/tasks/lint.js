/**
 * Lint task
 *
 * Run JShint
 *
 */
'use strict';

var gulp         = require('gulp'),
    config       = require('../config')(),
    plg          = require('gulp-load-plugins')({
                            pattern: ['gulp-*', 'gulp.*'],
                            replaceString: /^gulp(-|\.)/,
                            camelize: true,
                            lazy: true});

var scssLintStylish = require('gulp-scss-lint-stylish');

gulp.task('lint', function() {
  return gulp
      .src(config.js)
      .pipe(plg.jshint())
      .pipe(plg.jshint.reporter('jshint-stylish', {
        verbose: true
      }));
});

gulp.task('jscs', function() {
  return gulp
        .src(config.js)
        .pipe(plg.jscs());
});

gulp.task('eslint', function() {
  return gulp
        .src(config.ngApp)
        .pipe(plg.eslint())
        .pipe(plg.eslint.format());
});

gulp.task('scsslint', function() {
  return gulp
          .src(config.sass)
          .pipe(plg.scssLint({
            config: config.root + '.scss-lint.yml',
            reporterOutput: config.root + 'doc/' + 'scssReport.json',
            customReport: scssLintStylish
          }));
});

/**
 * Lint task
 *
 * Run JShint
 *
 */
'use strict';

var gulp    = require('gulp'),
    config  = require('../config')(),
    plg     = require('gulp-load-plugins')({
                pattern: ['gulp-*', 'gulp.*'],
                replaceString: /^gulp(-|\.)/,
                camelize: true,
                lazy: true});

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
            reporterOutput: config.docu + 'scss/' + 'scssReport.json',
            customReport: plg.scssLintStylish
          }));
});

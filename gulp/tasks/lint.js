/**
 * Lint task
 *
 * Run JShint
 *
 */
'use strict';

var args         = require('yargs').argv;
var gulp         = require('gulp'),
    config       = require('../config')(),
    error        = require('../util/error'),
    stylish      = require('jshint-stylish'),
    plg          = require('gulp-load-plugins')({lazy: true});

gulp.task('lint', function() {
  return gulp
      .src(config.js)
      .pipe(plg.if(args.verbose, plg.print()))
      .pipe(plg.jshint())
      .pipe(plg.jshint.reporter('jshint-stylish', {
        verbose: true
      }));
});

gulp.task('jscs', function() {
  return gulp
        .src(config.js)
        .pipe(plg.if(args.verbose, plg.print()))
        .pipe(plg.jscs());
});

gulp.task('scsslint', function() {
  return gulp
          .src(config.sass)
          .pipe(plg.scsslint({
            config: config.root + '.scss-lint.yml'
          }))
          .pipe(plg.scsslint.reporter());
});

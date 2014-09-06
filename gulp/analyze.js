'use strict';

var gulp = require('gulp')
  , $ = require('gulp-load-plugins')()

  , appBase = 'app/'
  , appScriptFiles = appBase + '**/*.js'

  , e2eFiles = 'e2e/**/*.js'
  , unitTests = 'app/**/*.js';

// lint CoffeeScript and jshint and jscs JavaScript
gulp.task('lint', function () {
  var jsFilter = $.filter('**/*.js');

  return gulp.src([
    appScriptFiles,
    e2eFiles,
    unitTests
  ])
    .pipe(jsFilter)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jscs());
});

// run plato anaylysis on JavaScript files
gulp.task('staticAnalysis', function () {
  var jsFilter = $.filter('**/*.js');

  return gulp.src([
    appScriptFiles,
    e2eFiles,
    unitTests
  ])
    .pipe(jsFilter)
    .pipe($.plato('report'));
});

gulp.task('analyze', ['lint', 'staticAnalysis']);

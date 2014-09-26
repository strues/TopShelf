'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    gulpIf = require('gulp-if'),
    size = require('gulp-size'),
    plumber = require('gulp-plumber'),
    jscs = require('gulp-jscs');

var browserSync = require('browser-sync');

var reload = browserSync.reload;

/**
 * Lint JavaScript-files
 */
gulp.task('lint', function() {

  return gulp.src('client/app/**/*.js')
    .pipe(reload({stream: true, once: true})) // after a file is written, reload the js
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpIf(!browserSync.active, jshint.reporter('fail')))
    .pipe(plumber())
/*    .pipe(jscs())
    .pipe(plumber())*/
    .pipe(size({title: 'jshint'}));
});
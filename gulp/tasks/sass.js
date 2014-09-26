'use strict';

var gulp = require('gulp'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso         = require('gulp-csso'),
    gulpif       = require('gulp-if'),
    uncss        = require('gulp-uncss'),
    handleErrors = require('../util/handleErrors'),
    size         = require('gulp-size'),
    minCSS       = require('gulp-minify-css');


/**
 * Compile sass-stylesheets into css-files
 */
gulp.task('sass', function() {

  return gulp.src(['client/app/app.scss'])
    .pipe(sass({
      style: 'expanded'
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(size({title: 'styles'}))
});
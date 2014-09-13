/** 
 * Index
 * 
 * @return {Function}
 */
'use strict';
var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    ngFilesort = require('gulp-angular-filesort'),
    rimraf = require('rimraf'),
    config = require('../config.js');

gulp.task('index', ['vendor', 'scripts', 'styles'], function () {
  var target = gulp.src('./src/index.html');
  var sources = gulp.src([
    './dist/public/js/vendor.min.js',
    './dist/public/js/app.js',
    './dist/public/js/templates.js'
    ]);

  return target.pipe(plugins.inject(sources, {read: false, ignorePath: './dist/public/'}))
    .pipe(gulp.dest('./dist/public'));
});
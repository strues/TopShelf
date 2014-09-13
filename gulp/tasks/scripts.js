/** 
 * srcScripts
 * handles annotating, concats, uglifying for app.js.
 * then concats, minifies, and copies css to dist directory.
 * @return {Function}
 */
'use strict';
var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    rimraf = require('rimraf'),
    ngFilesort = require('gulp-angular-filesort'),
    config = require('../config.js');

gulp.task('scripts', function() {
  return gulp.src(config.paths.srcJS)
  .pipe(ngFilesort())
  .pipe(plugins.ngAnnotate())
  .pipe(plugins.concat('app.js'))
  .pipe(gulp.dest(config.paths.distJS));
});
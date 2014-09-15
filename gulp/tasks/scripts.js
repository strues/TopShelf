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
  return gulp.src(config.paths.app.js)
  .pipe(ngFilesort())
  .pipe(plugins.changed(config.paths.dist.js))
  .pipe(plugins.ngAnnotate())
  .pipe(plugins.concat('app.js'))
  .pipe(plugins.size())
  .pipe(plugins.notify())
  .pipe(gulp.dest(config.paths.dist.js));
});
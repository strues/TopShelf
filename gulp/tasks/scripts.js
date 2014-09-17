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

var scriptsGlob = 'src/app/**/*.js';

gulp.task('scripts', function() {
  return gulp.src(scriptsGlob)
      .pipe(plugins.cached('scripts'))        // only pass through changed files
      .pipe(plugins.jshint())                 // do special things to the changed files...
      .pipe(ngFilesort())
      .pipe(plugins.remember('scripts'))     
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.concat('app.js'))
      .pipe(plugins.size())
      .pipe(plugins.notify())
      .pipe(gulp.dest('dist/public/js/'));
});

/** 
 * vendorJS
 * Performs jshint and finishes off by producing a plato
 * report for reference
 * @return {Function}
 */

'use strict';
var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    rimraf = require('rimraf'),
    ngFilesort = require('gulp-angular-filesort'),
    mainBowerFiles = require('main-bower-files'),
    config = require('../config.js');

var jsFilter = plugins.filter('*.js');

gulp.task('vendor', function(){
  return gulp.src(mainBowerFiles())
    .pipe(jsFilter)
    .pipe(plugins.uglify())
    .pipe(plugins.concat('vendor.min.js'))
    .pipe(gulp.dest("dist/public/js"));
});

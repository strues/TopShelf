/** 
 * Watch
 * Watches files for changes
 * @return {Function}
 */
'use strict';
var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    rimraf = require('rimraf'),
    config = require('../config.js');

var appBase = 'src/',
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('watch', function () {
  browserSync.reload();
  gulp.watch([appBase + '**/*'], ['build', browserSync.reload]);
});


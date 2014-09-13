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


gulp.task('watch', function () {
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/app/**/*.js', ['scripts']);
  gulp.watch('src/index.html', ['index']);
  gulp.watch('src/**/*.tpl.html', ['templates']);
  gulp.watch('bower.json');
});
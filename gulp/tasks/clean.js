/**
 * Clean task
 *
 * Deletes all folders
 *
 */

'use strict';

var gulp        = require('gulp'),
    config      = require('../config')(),
    error       = require('../util/error'),
    del         = require('del'),
    plg         = require('gulp-load-plugins')({lazy: true});

/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean', function(done) {
  var delconfig = [].concat(config.build, config.temp, config.report);
  del(delconfig, done);
});

/**
 * Remove all fonts from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-fonts', function(done) {
  clean(config.build + 'font/**/*.*', done);
});

/**
 * Remove all images from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-images', function(done) {
  clean(config.build + 'img/**/*.*', done);
});

/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-sass', function(done) {
  var files = [].concat(
      config.temp + '**/*.css',
      config.build + 'styles/**/*.css'
  );
  clean(files, done);
});

/**
 * Remove all js and html from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-code', function(done) {
  var files = [].concat(
      config.temp + '**/*.js',
      config.build + 'js/**/*.js'
  );
  clean(files, done);
});

gulp.task('clean-cache', function() {
  plg.cache.clearAll();
});

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
  del(path, done);
}

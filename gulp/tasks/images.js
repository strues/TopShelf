/** 
 * srcImages
 * Performs image optimization
 * @return {Function}
 */

'use strict';
var gulp     = require('gulp'),
    plugins  = require("gulp-load-plugins")({ lazy:false }),
    path     = require('path'),
    pngcrush = require('imagemin-pngcrush'),
    svgo     = require('imagemin-svgo'),
    rimraf   = require('rimraf'),
    config   = require('../config.js');

gulp.task('images', function() {
  return gulp.src(config.paths.srcImages)
 .pipe(plugins.cache(plugins.imagemin({ 
    optimizationLevel: 5, progressive: true, interlaced: true })))
  .pipe(gulp.dest(config.paths.distImages));
 });
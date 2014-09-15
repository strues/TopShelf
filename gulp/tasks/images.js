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
  return gulp.src(config.paths.app.img)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(config.paths.dist.img));
 });
/** 
 * srcSass
 * handles vendor prefixes for main.scss.
 * then concats, minifies, and copies css to dist directory.
 * @return {Function}
 */
'use strict';
var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    rimraf = require('rimraf'),
    config = require('../config.js');

gulp.task('styles', function() {
    return gulp.src(config.paths.srcSass)
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer('last 1 version'))
        .pipe(plugins.csso())
        .pipe(plugins.rename('main.css'))
        .pipe(gulp.dest(config.paths.distCSS));
});
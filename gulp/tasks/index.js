/** 
 * Index
 * 
 * @return {Function}
 */
'use strict';
var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    ngFilesort = require('gulp-angular-filesort'),
    rimraf = require('rimraf'),
    config = require('../config.js');

gulp.task('index', ['vendor', 'scripts', 'styles'], function () {
  return gulp.src('./src/index.html')
    .pipe(plugins.inject(gulp.src(
        [ 
        './dist/public/js/vendor.min.js',
        './dist/public/js/app.js',
        './dist/public/js/templates.js',
        './dist/public/css/main.min.css'
        ], 
    {read: false}), {ignorePath: '/dist/public/'}, {addRootSlash: false}))
    .pipe(gulp.dest(config.paths.dist.root));
});
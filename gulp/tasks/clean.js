/**
 * clean
 * removes the dist directory
 * @param  {Function} cb 
 * @return {Function}
 */

'use strict';
var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    rimraf = require('rimraf'),
    config = require('../config.js');


gulp.task('clean', function (cb) {
   return rimraf.sync(config.paths.dist, cb);
});
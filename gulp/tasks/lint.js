/** 
 * srcScripts -- Lint
 * Performs jshint and finishes off by producing a plato
 * report for reference
 * @return {Function}
 */
'use strict';
var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    rimraf = require('rimraf'),
    help = require('gulp-help'),
    stylish = require('jshint-stylish'),
    config = require('../config.js');

gulp.task('lint', function() {
  return gulp.src(config.paths.app.js)
  .pipe(plugins.jshint())
  .pipe(plugins.jshint.reporter('jshint-stylish'))
  .pipe(plugins.plato('report', {
            jshint: {
                options: {
                    strict: true
                }
            },
            complexity: {
                trycatch: true
            }
        })
)});
'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    config = require('../gulp.config')(),
    path = require('path'),
    _ = require('lodash'),
    $ = require('gulp-load-plugins')({
        lazy: true
    });

var del = require('del');

gulp.task('clean', function() {
    return del([config.temp, config.build])
    $.notify('Deleting temp and build folders');
});

gulp.task('clean:sass', function() {
    return del([config.temp])
    $.notify('Deleting temp folders');
});

/**
 * Log. With options.
 *
 * @param {String} msg
 * @param {Object} options
 */
function log(msg, options) {
    options = options || {};
    console.log(
        (options.padding ? '\n' : '') +
        chalk.yellow(' > ' + msg) +
        (options.padding ? '\n' : '')
    );
}

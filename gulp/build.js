'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    config = require('../gulp.config')(),
    path = require('path'),
    _ = require('lodash'),
    args = require('yargs').argv,
    $ = require('gulp-load-plugins')({
        lazy: true
    });
var del = require('del');

/**
 * Build everything
 * This is separate so we can run tests on
 * optimize before handling image or fonts
 */
gulp.task('build', ['clean', 'optimize', 'images', 'fonts'], function() {
    del(config.temp);
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

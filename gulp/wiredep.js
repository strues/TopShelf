'use strict';

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    config = require('../gulp.config')(),
    path   = require('path'),
    _      = require('lodash'),
    $      = require('gulp-load-plugins')({lazy: true});

gulp.task('wiredep', function() {

    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(inject(config.js, '', config.jsOrder))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject(src, label, order) {
    var options = {read: false};
    if (label) {
        options.name = 'inject:' + label;
    }

    return $.inject(orderSrc(src, order), options);
}

/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc (src, order) {
    order = order || ['**/*'];
    return gulp
        .src(src)
        .pipe($.order(order));
}

/**
 * ApiDoc task
 *
 * Generate API documentation using apidoc
 */
'use strict';

var gulp         = require('gulp'),
    config       = require('../config')(),
    error        = require('../util/error'),
    plg          = require('gulp-load-plugins')({lazy: true});// jshint ignore:line

gulp.task('apidoc', function() {
  plg.apidoc.exec({
    src: config.server,
    dest: './doc/api',
    debug: true,
    includeFilters: ['.*\\.js$']
  });
});

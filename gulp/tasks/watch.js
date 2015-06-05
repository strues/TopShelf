/**
 * Watch Task
 *
 * Watches the files for changes
 */

'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    config      = require('../config')(),
    error       = require('../util/error');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['serve'], function() {

  process.env.ENVIRONMENT_TYPE = 'development';

  gulp.watch(config.sass, ['sass']);
  gulp.watch(config.ngApp, ['lint']);
  gulp.watch(config.index, ['inject']);
  gulp.watch(config.html, ['partials']);

});

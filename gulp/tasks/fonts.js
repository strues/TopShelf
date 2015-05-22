/**
 * Fonts task
 *
 * Move/Copy fonts
 *
 */

'use strict';

var gulp         = require('gulp'),
    config       = require('../config')(),
    plg          = require('gulp-load-plugins')({lazy: true});// jshint ignore:line

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', ['clean-fonts'], function() {
  plg.notify('Copying fonts');

  return gulp
      .src(config.fonts)
      .pipe(gulp.dest(config.build + 'font'));
});

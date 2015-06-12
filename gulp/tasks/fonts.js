/**
 * Fonts task
 *
 * Move/Copy fonts
 */
'use strict';
var gulp    = require('gulp'),
    config  = require('../config')(),
    plg     = require('gulp-load-plugins')({
                pattern: ['gulp-*', 'gulp.*'],
                replaceString: /^gulp(-|\.)/,
                camelize: true,
                lazy: true});
/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', ['clean-fonts'], function() {
  plg.notify('Copying fonts');

  return gulp
      .src(config.font)
      .pipe(gulp.dest(config.buildC + 'assets/font'));
});

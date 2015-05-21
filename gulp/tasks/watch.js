/**
 * Watch Task
 *
 * Watches the files for changes
 */

'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    plg         = require('gulp-load-plugins')({lazy: true}), // jshint ignore:line
    config      = require('../config')(),
    error       = require('../util/error'),
    colors      = plg.util.colors;

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  //gulp.watch([config.client + '/*.html', 'bower.json'], ['inject', 'bower']);

  gulp.watch([
    config.sass
    ], function(event) {
      if (isOnlyChange(event)) {
        gulp.start('sass');
      } else {
        gulp.start('inject');
      }
    });

  gulp.watch([
    config.js
    ], function(event) {
      if (isOnlyChange(event)) {
        gulp.start('lint');
      } else {
        gulp.start('inject');
      }
    });

  gulp.watch(config.client + '/app/**/*.tpl.html', function(event) {
      browserSync.reload(event.path);
    });
});


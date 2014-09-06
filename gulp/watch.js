'use strict';

var gulp = require('gulp')
  , $ = require('gulp-load-plugins')({
    pattern: [
      'gulp-*',
      'browser-sync'
    ]
  })

  , appBase = 'app/'
  , unitTestFiles = 'app/**/*_test.*'

  , build = 'build/';

var nodemon = require('gulp-nodemon');
var BROWSER_SYNC_RELOAD_DELAY = 500;
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'server/app.js',

    // watch core server file(s) that require server restart on change
    watch: ['server/app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false   //
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browserSync', ['nodemon'], function () {
    browserSync({
      proxy: "localhost:9000",
      open: false,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    })
  });

gulp.task('watch', function () {
  $.browserSync.reload();
  gulp.watch([unitTestFiles], ['unitTest']);
  gulp.watch([appBase + '**/*'], ['build', $.browserSync.reload]);
});

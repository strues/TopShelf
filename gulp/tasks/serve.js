/** 
 * Serve
 * Serve the app using BrowserSync
 * @return {Function}
 */

'use strict';
var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    nodemon = require('gulp-nodemon'),
    config = require('../config.js');

/**
 * Gulp Tasks
 */
 
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync({
    proxy: 'localhost:9000',  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});
 
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'server/app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('serve', ['watch', 'nodemon'], function () {
  browserSync({
    proxy: 'localhost:9000',  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('dist');
});

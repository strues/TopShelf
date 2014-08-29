'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var httpProxy = require('http-proxy');
var server = require('gulp-express');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', ['nodemon', 'reload-browser'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:9000',
    port: 5000,
    notify: true,
    https: true
   
  });
  gulp.watch(['client/*.html'], reload);
  gulp.watch(['client/styles/**/*.scss'], ['styles'], reload);
  gulp.watch(['client/app/**/*.js'], ['scripts'], reload);
  gulp.watch(['client/app/**/*.tpl.html'], reload);
  gulp.watch(['.tmp/**/*.css'], reload);
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    verbose: true,
    script: 'server/app.js',
    ext: 'js html scss',
    ignore: ['build', 'bower_components', 'node_modules', '.sass-cache', '.idea', '.git']
  }).on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  }).on('change', function () {
    gulp.run('reload-browser');
  });
});

gulp.task('reload-browser', ['server_restart'], function () {
  setTimeout(function () {
    reload({ stream: false });
  }, 1000);
});
gulp.task('server_restart', function () {

});
/**
 * 1. Start the server
 * 2. Launch Browser-Sync
 */

'use strict';

var browserSync = require('browser-sync'),
  plg = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /^gulp(-|\.)/,
    camelize: true,
    lazy: true
  }),
  config = require('../config')(),
  gulp = require('gulp');

var reload = browserSync.reload;

gulp.task('runapp', function() {
  return plg.nodemon({
      script: 'src/server/app.js',
      ext: 'js',
      ignore: [
        'Vagrantfile',
        '.tmp/**',
        '.vagrant/**',
        'puphpet/**',
        'vm/**',
        '.git/**',
        'node_modules/**',
        'bower_components/**',
        '.sass-cache'],
      verbose: true
    })
    .on('restart', function () {
      console.log('restarted');
      setTimeout(browserSync.reload, 500);
    });
});

gulp.task('serve', ['sass', 'partials', 'lint', 'inject', 'runapp'], function() {

  browserSync({
    proxy: {
      target: '127.0.0.1:9000' // express' port
    },
    port: 3000, // browser-sync's port
    browser: ['google chrome'],
    files: [
      config.client + '**/*',
      config.temp + '**/*.css',
      '!' + config.sass
    ],
    open: false,
    ui: false,
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'topshelf',
    notify: true,
    ghost: false,
    xip: false
  });
  console.log('Starting BrowserSync on port 3000');
  gulp.watch(config.sass, ['sass'], reload);
  gulp.watch(config.ngApp, ['lint'], reload);
  gulp.watch(config.index, ['inject'], reload);
  gulp.watch(config.html, ['partials'], reload);

});

'use strict';

var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    plg         = require('gulp-load-plugins')({lazy: true}), // jshint ignore:line
    config      = require('../config')(),
    error       = require('../util/error'),
    colors      = plg.util.colors;

// Downloads the selenium webdriver
gulp.task('webdriver-update', plg.protractor.webdriver_update);

gulp.task('webdriver-standalone', plg.protractor.webdriver_standalone);

function runProtractor (done) {

  gulp.src(config.e2e + '/**/*.js')
      .pipe(plg.protractor.protractor({
        configFile: 'protractor.conf.js'
      }))
      .on('error', function (err) {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      })
      .on('end', function () {
        // Close browser sync server
        browserSync.exit();
        done();
      });
}

gulp.task('protractor', ['protractor:src']);
gulp.task('protractor:src', ['serve:e2e', 'webdriver-update'], runProtractor);
gulp.task('protractor:dist', ['serve:e2e-dist', 'webdriver-update'], runProtractor);

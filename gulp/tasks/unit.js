/**
 * Unit Testing Task
 *
 */

'use strict';

var args = require('yargs').argv;
var browserSync = require('browser-sync'),
    glob        = require('glob'),
    _           = require('lodash'),
    plg         = require('gulp-load-plugins')({lazy: true}), // jshint ignore:line
    config      = require('../config')(),
    gulp        = require('gulp'),
    path        = require('path'),
    minifyCSS   = require('gulp-minify-css'),
    ngFS        = require('gulp-angular-filesort'),
    error       = require('../util/error'),
    colors      = plg.util.colors,
    wiredep     = require('wiredep'),
    karma       = require('karma'),
    concat      = require('concat-stream');

function listFiles(callback) {
    var wiredepOptions = _.extend({}, config.wiredep, {
      dependencies: true,
      devDependencies: true
    });
    var bowerDeps = wiredep(wiredepOptions);

    var specFiles = [
      config.client + '/app/**/*.spec.js',
      config.client + '/app/**/*.mock.js'
    ];

    var htmlFiles = [
      config.client + '/*.html',
      config.client + '/**/*.tpl.html'
    ];

    var srcFiles = [
      config.client + '/app/**/*.js'
    ].concat(specFiles.map(function(file) {
      return '!' + file;
    }));

    gulp.src(srcFiles)
      .pipe(plg.angularFilesort())
      .pipe(concat(function(files) {
        callback(bowerDeps.js
          .concat(_.pluck(files, 'path'))
          .concat(htmlFiles)
          .concat(specFiles));
      }));
  }

function runTests (singleRun, done) {
    listFiles(function(files) {
      karma.server.start({
        configFile: __dirname + '/../../karma.conf.js',
        files: files,
        singleRun: singleRun,
        autoWatch: !singleRun
      }, done);
    });
  }

gulp.task('test', ['inject'], function(done) {
    runTests(true, done);
  });
gulp.task('test:auto', ['watch'], function(done) {
    runTests(false, done);
  });

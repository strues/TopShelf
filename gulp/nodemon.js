'use strict';

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    config = require('../gulp.config')(),
    path   = require('path'),
    nodemon = require('gulp-nodemon'),
    _      = require('lodash'),
    $      = require('gulp-load-plugins')({lazy: true});

gulp.task('nodemon', function () {
  nodemon({
      script: 'server/server.js',
      ext: 'js',
      ignore: [
        'node_modules/**',
        'bower_components/**'
            ],
      env: {'NODE_ENV': 'development'}
    })
    .on('change', ['vet'])
    .on('restart', function () {
      console.log('restarted!')
    })
});

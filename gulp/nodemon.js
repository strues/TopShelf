'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

var nodemon = require('gulp-nodemon');
var config = require('../gulp.config')();
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'glob', 'del']
});

gulp.task('nodemon', function () {
  nodemon({
      script: 'server/server.js',
      ext: 'html js scss css',
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

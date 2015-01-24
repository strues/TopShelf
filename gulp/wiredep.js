'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins');
var gutil = require('gulp-util');

// inject bower components
gulp.task('wiredep', function () {
    gutil.log('Wiring the bower dependencies into the html');
    var wiredep = require('wiredep').stream;

    return gulp.src('./client/index.html')
    .pipe(wiredep({
      debug: true,
      directory: './bower_components/',
      bowerJson: require('../bower.json'),
      ignorePath: '../..'
    }))
    //.pipe($.inject(gulp.src(config.appjs)))
    .pipe(gulp.dest('client'));
});

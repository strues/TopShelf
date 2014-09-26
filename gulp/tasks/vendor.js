/* jshint node: true */
'use strict';

var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
        path        = require('path'),
        config = require('../config'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require('gulp-rename'),
    concatJson2js = require('gulp-concat-json2js'),
    ngFilesort = require('gulp-angular-filesort');

gulp.task('vendor', function(){
    // concat application vendors
  return gulp.src([path.join(config.CLIENT,'vendors.json')])
        //.pipe(gulpif(config.env.jsSourceMaps , sourcemaps.init()))
        .pipe(concatJson2js('vendor.js'))
        .pipe(ngAnnotate()) // fix uglify mangleling - not compatible with sourceMaps
        .pipe(ngFilesort())
        .pipe(uglify())
        .pipe(rename({basename: 'vendor'})) //,suffix: '.min'
        //.pipe(gulpif(config.env.jsSourceMaps , sourcemaps.write()))
        .pipe(gulp.dest('./.tmp/js'))
});
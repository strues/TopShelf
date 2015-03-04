'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    chalk = require('chalk'),
    config = require('../gulp.config')(),
    path = require('path'),
    _ = require('lodash'),
    args = require('yargs').argv,
    $ = require('gulp-load-plugins')({
        lazy: true
    });

/**
 * TODO
 */
gulp.task('docs', ['docs:api', 'docs:todo'], function() {

});

gulp.task('docs:todo', function() {
    gulp.src(config.alljs)
        .pipe($.plumber())
        .pipe($.todo())
        .pipe(gulp.dest('./'))
        .pipe($.todo.reporter('json', {
            fileName: 'todo.json'
        }))
        .pipe(gulp.dest('./')) //output todo.md as markdown
});

gulp.task('docs:api', function() {
    $.apidoc.exec({
        src: './src/server/',
        dest: './docs/api'
    });
});

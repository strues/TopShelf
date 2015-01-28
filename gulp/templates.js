'use strict';

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    config       = require('../gulp.config')(),
    path         = require('path'),
    _            = require('lodash'),
    $            = require('gulp-load-plugins')({lazy: true});

gulp.task('templates', function () {

    return gulp
    .src(config.templates)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.temp))
    .pipe($.notify('$Templatecache compiled'));
});

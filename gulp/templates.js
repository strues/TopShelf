'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefixer = require('autoprefixer-core');
var config = require('../gulp.config')();
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'glob', 'del']
});

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
    .pipe($.notify('TemplateCache compiled'));
});

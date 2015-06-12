'use strict';
/**
  * @title Partials
  * @description A task to inject assets into and compress the main index.html
  * @example (cli) gulp minifyHtml
  * @return {Stream}
  */


var gulp    = require('gulp'),
    config  = require('../config')(),
    plg     = require('gulp-load-plugins')({
                pattern: ['gulp-*', 'gulp.*'],
                replaceString: /^gulp(-|\.)/,
                camelize: true,
                lazy: true});

gulp.task('partials', function() {
  return gulp
      .src(config.html)
      .pipe(plg.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(plg.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
      .pipe(plg.concat('templates.js'))
      .pipe(gulp.dest(config.temp))
      .pipe(plg.uglify())
      .pipe(gulp.dest(config.buildC))
      .pipe(plg.size({title: 'templates'}));
});

gulp.task('html:build', function() {
  var assets = plg.useref.assets();

  return gulp.src(config.index)
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(plg.useref())
    .pipe(plg.minifyHtml({
          empty: true,
          spare: true,
          quotes: true,
          collapse: true
     }))
    .pipe(gulp.dest(config.buildC));
  });

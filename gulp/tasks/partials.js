'use strict';
/**
  * @title Partials
  * @description A task to inject assets into and compress the main index.html
  * @example (cli) gulp minifyHtml
  * @return {Stream}
  */


var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    config       = require('../config')(),
    plg          = require('gulp-load-plugins')({
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
      .pipe(plg.uglify())
      .pipe(gulp.dest(config.temp))
      .pipe(browserSync.reload({stream: true}))
      .pipe(plg.size({showFiles: true}));
});

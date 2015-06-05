'use strict';
/*
 * @title Sass
 * @description A task to compile Sass to CSS
 * @example (cli) gulp sass
 */

var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    plg          = require('gulp-load-plugins')({
                            pattern: ['gulp-*', 'gulp.*'],
                            replaceString: /^gulp(-|\.)/,
                            camelize: true,
                            lazy: true}),
    config       = require('../config')(),
    handleErrors = require('../util/error');

/**
 * Compile Sass to css
 * @return {Stream}
 */
gulp.task('sass', function() {
  return gulp
      .src(config.sass)
      .pipe(plg.sassBulkImport())
      .pipe(plg.if(process.env.ENVIRONMENT_TYPE === 'development',
        plg.sourcemaps.init()))
      .pipe(plg.changed('sass', {
          extension: '.scss'
        }))
      .pipe(plg.sass({
        sourceMap: 'sass',
        outputStyle: 'expanded'
      }))
      .on('error', handleErrors)
      .pipe(plg.if(process.env.ENVIRONMENT_TYPE === 'development',
        plg.sourcemaps.write('./')))
      .pipe(plg.postcss([
        require('autoprefixer-core')({browsers: ['last 2 version']})
        ]))
      .pipe(gulp.dest(config.temp))
      .pipe(browserSync.reload({stream: true}))
      .pipe(plg.size({showFiles: true}));
});

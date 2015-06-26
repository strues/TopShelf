/*
 * @title Scripts
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
    config        = require('../config')(),
    handleErrors  = require('../util/error'),
    ngFS          = require('gulp-angular-filesort'),
    header        = require('../util/header');

gulp.task('scripts:build', function() {
  var options = {
    optional: ['strict']
  };
  return gulp
      .src(config.js)
      .pipe(plg.changed(config.buildC + 'js/'))
      .pipe(plg.babel(options))
      .pipe(plg.sourcemaps.init())
      .pipe(plg.ngAnnotate({remove: true, add: true, single_quotes: true }))
      .pipe(ngFS())
      .pipe(plg.stripDebug())
      .pipe(header())
      .pipe(plg.concat('app.js'))
      .pipe(plg.uglify({mangle: false}))
      .pipe(plg.sourcemaps.write('./'))
      .pipe(gulp.dest(config.buildC + 'js/'));
});

gulp.task('server:build', function() {
  var options = {
    optional: ['strict']
  };
  return gulp
    .src(config.serverJS)
    .pipe(plg.babel(options))
    .pipe(gulp.dest(config.build + 'server'));
});

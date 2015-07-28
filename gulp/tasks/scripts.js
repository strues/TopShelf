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
    path          = require('path'),
    ngFS          = require('gulp-angular-filesort'),
    header        = require('../util/header');

function webpack(watch, callback) {
  var webpackOptions = {
    watch: watch,
    module: {
      preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}]
    },
    output: {
        path: __dirname,
        filename: 'bundle.js'
    }
  };

  if(watch) {
    webpackOptions.devtool = 'inline-source-map';
  }

  var webpackChangeHandler = function(err, stats) {
    if(err) {
      conf.errorHandler('Webpack')(err);
    }
    plg.util.log(stats.toString({
      colors: plg.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    browserSync.reload();
    if(watch) {
      watch = false;
      callback();
    }
  };

  return gulp.src(path.join(config.ngApp, '/app.module.js'))
    .pipe(plg.webpack(webpackOptions, null, webpackChangeHandler))
    .pipe(gulp.dest(path.join(config.temp, '/app')));
}


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

gulp.task('scripts', function () {
  return webpack(false);
});

gulp.task('scripts:watch', ['scripts'], function (callback) {
  return webpack(true, callback);
});

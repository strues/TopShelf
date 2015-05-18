/**
 * Sass/Scss Task
 *
 * Compiles Sass
 */

'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    plg = require('gulp-load-plugins')({lazy: true}), // jshint ignore:line
    config = require('../config')(),
    error = require('../util/error'),
    colors = plg.util.colors;

var wiredep = require('wiredep').stream;
/**
 * Compile Sass to css
 * @return {Stream}
 */
gulp.task('sass', ['clean-sass'], function() {

  var injectFiles = gulp.src([
      config.client + '/app/**/*.scss',
      '!' + config.sass
    ], {
      read: false
    });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(config.client + '/app/', '');
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };
  var indexFilter = plg.filter('style.scss');
  var vendorFilter = plg.filter('vendor.scss');
  return gulp.src([
          config.client + '/styles/style.scss',
          config.client + '/styles/vendor.scss'
      ])
      .pipe(indexFilter)
      .pipe(plg.inject(injectFiles, injectOptions))
      .pipe(indexFilter.restore())
      .pipe(vendorFilter)
      .pipe(wiredep(config.wiredep))
      .pipe(vendorFilter.restore())
        .pipe(plg.changed('sass', {
          extension: '.scss'
        }))
        .pipe(plg.plumber()) // exit gracefully if something fails after this
        .pipe(plg.sourcemaps.init())
        .pipe(plg.sass({
          sourceMap: 'sass',
          outputStyle: 'compressed'
        }))
        .pipe(plg.postcss([
            require('autoprefixer-core')({
              browsers: ['last 2 version']
            })
        ]))
        .on('error', function handleError(err) {
          console.error(err.toString());
          this.emit('end');
        })
        .pipe(plg.sourcemaps.write())
        .pipe(plg.plumber.stop())
        .pipe(gulp.dest(config.temp))
        .pipe(browserSync.reload({
          stream: true
        }));
});

gulp.task('sass-watcher', function() {
  gulp.watch([config.sass], ['sass']);
});

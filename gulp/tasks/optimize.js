/**
 * Optimize Task
 * The essential step for building
 */

'use strict';

var args = require('yargs').argv;
var browserSync = require('browser-sync'),
    glob        = require('glob'),
    _           = require('lodash'),
    plg         = require('gulp-load-plugins')({lazy: true}), // jshint ignore:line
    config      = require('../config')(),
    gulp        = require('gulp'),
    path        = require('path'),
    minifyCSS   = require('gulp-minify-css'),
    ngFS        = require('gulp-angular-filesort'),
    error       = require('../util/error'),
    header      = require('../util/header'),
    colors      = plg.util.colors;

/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
gulp.task('optimize', ['inject'], function() {
  plg.notify('Optimizing the js, css, and html');

  var assets = plg.useref.assets({searchPath: './'});
  // Filters are named for the gulp-useref path
  var cssFilter = plg.filter('**/*.css');
  var jsAppFilter = plg.filter('**/' + config.optimized.app);
  var jslibFilter = plg.filter('**/' + config.optimized.lib);

  var templateCache = gulp.src(config.temp + config.templateCache.file);

  return gulp
      .src(config.index)
      .pipe(plg.plumber())
        .pipe(plg.inject(templateCache, {
          read: false
        }), {
          starttag: '<!-- inject:templates:js -->'
        })
        .pipe(assets) // Gather all assets from the html with useref
        // Get the css
        .pipe(cssFilter)
        .pipe(minifyCSS())
        .pipe(plg.size({showFiles: true}))
        .pipe(cssFilter.restore())
        // Get the custom javascript
        .pipe(jsAppFilter)
        //.pipe(plg.sourcemaps.init({debug: true, loadMaps: true}))
        .pipe(plg.ngAnnotate({
          remove: true,
          add: true,
          single_quotes: true
        }))
        .pipe(ngFS())
        .pipe(plg.stripDebug())
        //.pipe(plg.concat(config.optimized.app))
        .pipe(plg.uglify({mangle: false}))
        .pipe(plg.size({showFiles: true}))
        //.pipe(plg.sourcemaps.write())
        .pipe(jsAppFilter.restore())
        // Get the vendor javascript
        .pipe(jslibFilter)
        .pipe(header())
        .pipe(plg.uglify())
        .pipe(plg.size({showFiles: true}))
        .pipe(jslibFilter.restore())
        // Take inventory of the file names for future rev numbers
        .pipe(plg.rev())
        // Apply the concat and file replacement with useref
        .pipe(assets.restore())
        .pipe(plg.useref())
        // Replace the file names in the html with rev numbers
        .pipe(plg.revReplace())
        .pipe(gulp.dest(config.build))
        // add manifest.json for revision
        .pipe(plg.rev.manifest()).on('error', console.log)
        .pipe(gulp.dest(config.build));
});

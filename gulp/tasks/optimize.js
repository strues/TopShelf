/**
 * Optimize Task
 * The essential step for building
 */

'use strict';
var gulp      = require('gulp'),
    config    = require('../config')(),
    path      = require('path'),
    ngFS      = require('gulp-angular-filesort'),
    header    = require('../util/header'),
    plg       = require('gulp-load-plugins')({
                  pattern: ['gulp-*', 'gulp.*'],
                  replaceString: /^gulp(-|\.)/,
                  camelize: true,
                  lazy: true});

/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
gulp.task('optimize',  function() {
  var assets = plg.useref.assets();
  // Filters are named for the gulp-useref path
  var cssFilter = plg.filter('**/*.css');
  var jsAppFilter = plg.filter('**/' + config.optimized.app);
  var jslibFilter = plg.filter('**/' + config.optimized.lib);

  return gulp.src(config.index)
      .pipe(assets) // Gather all assets from the html with useref
      .pipe(plg.plumber())
      .pipe(cssFilter)
      .pipe(cssFilter.restore())
      .pipe(jsAppFilter)
      .pipe(jsAppFilter.restore())
        // Get the vendor javascript
      .pipe(jslibFilter)
      .pipe(jslibFilter.restore())
      .pipe(assets.restore())
      .pipe(plg.useref())
      // Replace the file names in the html with rev numbers
      .pipe(plg.revReplace())
      .pipe(plg.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        collapse: true
      }))
      .pipe(gulp.dest(config.build + 'client/'));
});

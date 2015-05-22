'use strict';
/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
var args         = require('yargs').argv;
var gulp         = require('gulp'),
    config       = require('../config')(),
    error        = require('../util/error'),
    plg          = require('gulp-load-plugins')({lazy: true});// jshint ignore:line

gulp.task('templatecache', ['clean-code'], function() {
  plg.notify('Creating an AngularJS $templateCache');

  return gulp
      .src(config.htmltemplates)
      .pipe(plg.if(args.verbose, plg.bytediff.start()))
        .pipe(plg.minifyHtml({
          comments: true,
          spare: true,
          quotes: true
        }))
        .pipe(plg.if(args.verbose, plg.bytediff.stop(bytediffFormatter)))
        .pipe(plg.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
  var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
  return data.fileName + ' went from ' +
      (data.startSize / 1000).toFixed(2) + ' kB to ' +
      (data.endSize / 1000).toFixed(2) + ' kB and is ' +
      formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted perentage
 */
function formatPercent(num, precision) {
  return (num * 100).toFixed(precision);
}

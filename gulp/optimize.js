'use strict';

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    chalk  = require('chalk'),
    config = require('../gulp.config')(),
    path   = require('path'),
    ngFS   = require('gulp-angular-filesort'),
    _      = require('lodash'),
    $      = require('gulp-load-plugins')({lazy: true});

gulp.task('optimize', ['clean', 'inject'], function() {
 var assets = $.useref.assets({searchPath: './'});
    // Filters are named for the gulp-useref path
    var cssFilter   = $.filter('**/*.css');
    var jsAppFilter = $.filter('**/' + config.optimized.app);
    var jslibFilter = $.filter('**/' + config.optimized.lib);

    var templateCache = config.temp + config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe($.inject(gulp.src(templateCache),
            {name: 'inject:templates', read: false}))
        .pipe(assets) // Gather all assets from the html with useref
        // Get the css
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe($.size())
        .pipe(cssFilter.restore())
        // Get the custom javascript
        .pipe(jsAppFilter)
        .pipe($.sourcemaps.init())
        .pipe($.ngAnnotate({add: true}))
        .pipe(ngFS())
        .pipe($.uglify())
        .pipe($.size())
        .pipe($.sourcemaps.write('./'))
        .pipe(jsAppFilter.restore())
        // Get the vendor javascript
        .pipe(jslibFilter)
        .pipe($.sourcemaps.init())
        .pipe($.uglify()) // another option is to override wiredep to use min files
        .pipe($.size())
        .pipe($.sourcemaps.write('./'))
        .pipe(jslibFilter.restore())
        // Take inventory of the file names for future rev numbers
        .pipe($.rev())
        // Apply the concat and file replacement with useref
        .pipe(assets.restore())
        .pipe($.useref())
        // Replace the file names in the html with rev numbers
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build));
});
/**
 * Log. With options.
 *
 * @param {String} msg
 * @param {Object} options
 */
function log (msg, options) {
  options = options || {};
  console.log(
    (options.padding ? '\n' : '') +
    chalk.yellow(' > ' + msg) +
    (options.padding ? '\n' : '')
  );
}

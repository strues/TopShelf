/**
 * Bower Task
 *
 * Inject Bower dependencies
 *
 */

'use strict';

var gulp         = require('gulp'),
    bowerFiles   = require('main-bower-files'),
    config       = require('../config')(),
    bowerExclude = require('../util/bowerExclusions'),
    plg          = require('gulp-load-plugins')({
                            pattern: ['gulp-*', 'gulp.*'],
                            replaceString: /^gulp(-|\.)/,
                            camelize: true,
                            lazy: true});

gulp.task('bower', function() {
  gulp.src(config.client + '/index.html')
        .pipe(plg.inject(gulp.src(bowerFiles(), {
          read: false
        }, {relative: 'true',
          ignorePath:  '../..'
        }), {
          starttag: '<!-- inject:bower:{{ext}} -->'
        }))
        .pipe(gulp.dest(config.client));
});
var filterByExtension = function(extension){
    return plg.filter(function(file){
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};

gulp.task('bower:build', function() {
    var bowerF = bowerFiles();
    var jsFilter = filterByExtension('js');

    gulp.src(bowerF)
    .pipe(plg.changed(config.buildC + 'js/'))
    .pipe(jsFilter)
    .pipe(plg.sourcemaps.init())
    .pipe(plg.concat('lib.js'))
    .pipe(plg.stripDebug())
    .pipe(plg.uglify())
    .pipe(plg.sourcemaps.write('./'))
    .pipe(plg.size())
    .pipe(gulp.dest(config.buildC + 'js/'));
});

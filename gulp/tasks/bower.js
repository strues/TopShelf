/**
 * Bower Task
 *
 * Inject Bower dependencies
 *
 */

'use strict';

var gulp     = require('gulp'),
bowerFiles   = require('main-bower-files'),
config       = require('../config')(),
bowerExclude = require('../util/bowerExclusions'),
plg          = require('gulp-load-plugins')({lazy: true});

gulp.task('bower', function() {

  gulp.src(config.client + '/index.html')
        .pipe(plg.inject(gulp.src(bowerFiles(), {
          read: false
        }, {relative: 'true',
          ignorePath: bowerExclude
        }), {
          starttag: '<!-- inject:bower:{{ext}} -->'
        }))
        .pipe(gulp.dest(config.client));
});

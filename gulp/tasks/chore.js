
 /**
  * Chore Task
  *
  * Git versioning and bump
  *
  */

 'use strict';

var gulp         = require('gulp'),
     config      = require('../config')(),
     fs          = require('fs'),
     rs          = require('run-sequence'),
     error       = require('../util/error'),
     del         = require('del'),
     plg         = require('gulp-load-plugins')({lazy: true});

gulp.task('chore', function(callback) {
  rs(
    'version',
    'bump',
    callback);
});

gulp.task('version', function() {
  return gulp
    .src(config.packages)
    .pipe(plg.bump({
        type: process.argv[3] ? process.argv[3].substr(2) : 'patch'
      }))
      .pipe(gulp.dest('./'));
});

gulp.task('bump', function() {
  fs.readFile(config.packages, function (err, data) {
    if (err) { return ; }
    return gulp
      .src(config.packages)
      .pipe(plg.git.add())
      .pipe(plg.git.commit('chore(core): bump to ' + JSON.parse(data).version));
  });
});

'use strict';
 var gutil        = require('gulp-util'),
      gulp        = require('gulp'),
      gulpif      = require('gulp-if'),
      path        = require('path'),
      concat      = require('gulp-concat'),
      rename      = require('gulp-rename'),
      sourcemaps  = require('gulp-sourcemaps'),
      ngAnnotate  = require('gulp-ng-annotate'),
      templateCache = require('gulp-angular-templatecache'),
      uglify      = require('gulp-uglify');


gulp.task('templates', function(){
    // before build JS we need to regenerate template file:
    return gulp.src(path.join('./client/app','**', '*.html')) //'./app/src/**/*.html')
        .pipe(templateCache({
            filename: 'templates.js',
            module:'templates',
            standalone: true
        }))
        .pipe(gulp.dest(path.join('./.tmp/js')));
});
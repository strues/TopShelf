'use strict';

var gulp = require('gulp');

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    return gulp.src('client/index.html')
    .pipe(wiredep({
      directory: 'bower_components',
      exclude: [/bootstrap-sass-official/, /bootstrap\.css/, /bootstrap\.css/]
    }))
    .pipe(gulp.dest('client'));
});

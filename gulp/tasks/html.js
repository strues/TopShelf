'use strict';


var config      = require('../config'),
    path        = require('path'),
    gutil       = require('gulp-util'),
    gulp        = require('gulp'),
    inject      = require("gulp-inject");


// require app to be concat and css generated before bundling html
gulp.task('html', ['scripts', 'sass'], function(){

    gulp.src(path.join(config.CLIENT,'index.html'))
        .pipe(inject(gulp.src(path.join(config.TMP_SASS, 'app.css'), {read: false}), {name: 'app'}, {relative: true}))
        //.pipe(inject(gulp.src(path.join(config.DIST_JS, 'angular.css'), {read: false}), {name: 'angular'}))
        .pipe(inject(gulp.src(path.join(config.DIST_JS, 'app.js'), {read: false}), {name: 'app'}, {relative: true}))
    //.pipe(inject(gulp.src(['./src/*.js', '!./src/importantFile.js'], {read: false})))
    .pipe(gulp.dest(config.DIST));

    //console.log('Copy HTML: ', path.join(config.SRC,"index.html"), 'into ', config.DIST)
    //gulp.src(path.join(config.SRC,"index.html")) //'./app/src/**/*.html')
    //.pipe(gulp.dest(config.DIST));

});
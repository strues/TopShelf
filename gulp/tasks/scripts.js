/* jshint node: true */
'use strict';

var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    path = require('path'),
    gulpif = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    config = require('../config'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngFilesort = require('gulp-angular-filesort');


/**
 * Builds the AngularJS modules.
 * This includes module definitions, and module components.
 */


// app depend of template and vendors file generation
gulp.task('scripts', ['templates', 'vendor'], function(){

    var srcFiles = [
        path.join(config.CLIENT_JS,'**', 'app.js'),
        path.join(config.TMP_JS, 'templates.js'),
        ];

    if( config.OVERRIDE_APP_CONFIG === true ) {
        srcFiles.push(path.join(config.CLIENT_JS,'**', '*.js') );
        srcFiles.push(config.OVERRIDE_APP_CONFIG_FILE_SRC );
        srcFiles.push(path.join(config.CLIENT_JS,'**', '!_config.js') );
    } else {
        srcFiles.push(path.join(config.CLIENT_JS,'**', '*.js') )
    }


    // then build all js sources:
    return gulp.src(srcFiles)
        //.pipe(gulpif(config.env.jsSourceMaps , sourcemaps.init()))
        .pipe(concat('app.js'))
        .pipe(ngFilesort())
        .pipe(gulpif(config.env.jsUglify , ngAnnotate() )) // fix uglify mangleling - not compatible with sourceMaps
        .pipe(gulpif(config.env.jsUglify , uglify() ))
        //.pipe(gulpif(config.env.jsSourceMaps , sourcemaps.write()))
        .pipe(gulp.dest(config.TMP_JS))
});
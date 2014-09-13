/**
 * templates
 * compiles partials into angular $templatecache
 * @param  {Function} cb 
 * @return {Function}
 */

'use strict';
var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({ lazy:false }),
    path = require('path'),
    rimraf = require('rimraf'),
    templateCache = require('gulp-angular-templatecache'),
    config = require('../config.js');

gulp.task('templates', function() {
    return gulp.src(config.paths.srcTmpl)
    .pipe(plugins.htmlmin())
    .pipe(templateCache({
      standalone: 'true',
      module: 'templates'
    }))
    .pipe(plugins.rename('templates.js'))
    .pipe(gulp.dest('./dist/public/js'));
});
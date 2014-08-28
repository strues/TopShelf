'use strict';

var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch('client/styles/**/*.scss', ['styles', server.notify]);
  gulp.watch('client/app/**/*.tpl.html', server.notify);
  gulp.watch('.tmp/**/*.*', server.notify);
  gulp.watch('client/app/**/*.js', ['scripts', server.notify]);
  gulp.watch('client/assets/images/**/*', ['images', server.notify]);
  gulp.watch('bower.json', ['wiredep', server.notify]);
});

'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch('client/styles/**/*.scss', ['styles']);
  gulp.watch('client/app/**/*.js', ['scripts']);
  gulp.watch('client/assets/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});

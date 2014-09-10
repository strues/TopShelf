'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'styles'] ,function () {
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});

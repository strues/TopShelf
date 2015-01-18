'use strict';

var gulp = require('gulp');

gulp.task('watch', ['wiredep', 'injector:css', 'injector:js'], function () {
    gulp.watch('client/{app,styles}/**/*.scss', ['injector:css']);
    gulp.watch('client/{app,components}/**/*.js', ['injector:js']);
    gulp.watch('client/assets/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});

var gulp = require('gulp'),
    help = require('gulp-help'),
    config = require('./gulp/config.js');
    requireDir = require('require-dir');


requireDir('./gulp', { recurse: true });

gulp.task('default', ['clean', 'serve']);
gulp.task('build', ['clean','lint','vendor','scripts', 'templates','styles', 'index'])

gulp.task('copy:fonts', function() {
  return gulp.src(config.paths.srcFonts)
    .pipe(gulp.dest('./dist/public/'))

});


console.log('ngGulpSoop in ' + process.env.NODE_ENV + ' environment.');
if (process.env.NODE_ENV === undefined) {
  console.log('Assuming development environment')
}
var gulp = require('gulp'),
    help = require('gulp-help'),
    requireDir = require('require-dir');


requireDir('./gulp', { recurse: true });

gulp.task('default', ['clean', 'serve']);
gulp.task('build', ['clean','lint','vendor','scripts', 'templates','styles','images', 'index'])

console.log('ngGulpSoop in ' + process.env.NODE_ENV + ' environment.');
if (process.env.NODE_ENV === undefined) {
  console.log('Assuming development environment')
}
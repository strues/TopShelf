var gulp = require('gulp');
var config = require('../config');
var mocha = require('gulp-spawn-mocha');

// Test server js files
gulp.task('server:test', function() {
  return gulp.src('src/server/**/*.spec.js', {read: false})
    .pipe(mocha({
      reporter: 'nyan',
      compilers: 'js:babel/register',
      env: {
        'NODE_ENV': 'test',
        'PORT': 9999
      }
    }));
});

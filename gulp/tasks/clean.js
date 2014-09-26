
'use strict';

var gulp = require('gulp'),
    del = require('del');

/**
 * Remove the .tmp- and dist-folder
 */
gulp.task('clean', function() {
  
  del(['.tmp', '.sass-cache', 'dist'], function(err) {
    if(err) return console.error(err);
  });

});
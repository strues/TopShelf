'use strict';
/**
 * Todo Creation Task
 *
 * Creates a todo document from @TODO: inline code
 *
 */

var gulp    = require('gulp'),
    config  = require('../config')(),
    error   = require('../util/error'),
    plg     = require('gulp-load-plugins')({lazy: true});

var args    = require('yargs').argv;

gulp.task('todo', function() {
  plg.notify('Compiling todo notes');

  return gulp
      .src(config.js)
      .pipe(plg.if(args.verbose, plg.print()))
      .pipe(plg.todo())
      .pipe(gulp.dest('./docs')) //output todo.md as markdown
        .pipe(plg.todo.reporter('json', {
          fileName: 'todo.json'
        }))
        .pipe(gulp.dest('./docs')); //output todo.json as json
});

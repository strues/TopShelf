'use strict';

/**
  * @title Todo
  * @description Creates a todo document from @TODO: inline code
  * @example (cli) gulp todo
  */
var gulp    = require('gulp'),
    config  = require('../config')(),
    plg     = require('gulp-load-plugins')({
                        pattern: ['gulp-*', 'gulp.*'],
                        replaceString: /^gulp(-|\.)/,
                        camelize: true,
                        lazy: true});

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

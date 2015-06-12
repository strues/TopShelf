/**
 * Documentation Task
 *ApiDoc task, ngDoc , SassDoc
 *
 *@description
 * Generate API documentation using apidoc
 * Generate Scss documentation using SassDoc
 */
'use strict';

var gulp    = require('gulp'),
    config  = require('../config')(),
    sassdoc = require('sassdoc'),
    plg     = require('gulp-load-plugins')({lazy: true});

gulp.task('apidoc', function() {
  plg.apidoc.exec({
    src: config.server,
    dest: config.docu + 'api/',
    debug: true,
    includeFilters: ['.*\\.js$']
  });
});

gulp.task('sassdoc', function() {
  return gulp
    .src(config.sass)
    .pipe(sassdoc({
      dest: config.docu
    }));
});

gulp.task('todo', function() {
  plg.notify('Compiling todo notes');

  return gulp
      .src(config.js)
      .pipe(plg.print())
      .pipe(plg.todo())
      .pipe(gulp.dest(config.docu)) //output todo.md as markdown
        .pipe(plg.todo.reporter('json', {
          fileName: 'todo.json'
        }))
      .pipe(gulp.dest('./docs')); //output todo.json as json
});

'use strict';

var plg = require('gulp-load-plugins')();

module.exports = function () {

  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  plg.notify.onError({
    title: 'Gulp Compile Error',
    message:
    '<%= error.message %>\n<%= error.fileName %>:<%= error.lineNumber %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

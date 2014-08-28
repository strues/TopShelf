'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var httpProxy = require('http-proxy');
var server = require('gulp-express');

/* This configuration allow you to configure browser sync to proxy your backend */
var proxyTarget = 'http://localhost:9000'; // The location of your backend
var proxyApiPrefix = 'api'; // The element in the URL which differentiate between API request and static file request

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

var proxy = httpProxy.createProxyServer({
  target: proxyTarget
});

function proxyMiddleware(req, res, next) {
  if (req.url.indexOf(proxyApiPrefix) !== -1) {
    proxy.web(req, res);
  } else {
    next();
  }
}

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  browserSync.instance = browserSync.init(files, {
    startPath: '/index.html',
    server: {
      baseDir: baseDir,
      middleware: proxyMiddleware
    },
    browser: browser
  });

}


gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: './server/app.js',

    // watch core server file(s) that require server restart on change
    watch: ['./server/app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false   //
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('server', ['watch'], function () {
    //start the server at the beginning of the task
    server.run({
        file: 'server/app.js'
    });

});
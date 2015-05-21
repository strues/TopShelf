/**
 * 1. Start the server
 * 2. Launch Browser-Sync
 */

'use strict';

var browserSync = require('browser-sync'),
    glob        = require('glob'),
    _           = require('lodash'),
    plg         = require('gulp-load-plugins')({lazy: true}),// jshint ignore:line
    config      = require('../config')(),
    gulp        = require('gulp'),
    path        = require('path'),
    error       = require('../util/error'),
    colors      = plg.util.colors;

var args = require('yargs').argv;

/**
 * serve the dev environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-dev', ['watch'], function() {
  serve(true /*isDev*/);
});

/**
 * serve the build environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-build', ['build'], function() {
  serve(true /*isDev*/);
});

// __________________________________________________________________________
// Functions and Config for nodemon / Browser-Sync
// ==========================================================================

function getNodeOptions(isDev) {
  return {
    script: config.nodeServer,
    ext: 'html js scss css',
    delayTime: 1,
    env: {
      'PORT': config.defaultPort,
      'NODE_ENV': isDev ? 'development' : 'production'
    },
    watch: [config.server]
  };
}

function runNodeInspector() {
  plg.notify('Running node-inspector.');
  plg.notify('Browse to http://localhost:8080/debug?port=5858');
  var exec = require('child_process').exec;
  exec('node-inspector');
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */

function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  plg.notify('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * serve the code
 * --debug-brk or --debug
 * --nosync
 * @param  {Boolean} isDev - dev or build mode
 * @param  {Boolean} specRunner - server spec runner html
 */

function serve(isDev) {
  var debug = args.debug || args.debugBrk;
  var debugMode = args.debug ? '--debug' : args.debugBrk ? '--debug-brk' : '';
  var nodeOptions = getNodeOptions(isDev);

  if (debug) {
    runNodeInspector();
    nodeOptions.nodeArgs = [debugMode + '=5858'];
  }

  if (args.verbose) {
    console.log(nodeOptions);
  }

  return plg.nodemon(nodeOptions)
        .on('restart', [], function(ev) {
          plg.notify('*** nodemon restarted');
          plg.notify('files changed:\n' + ev);
          setTimeout(function() {
            browserSync.notify('reloading now ...');
            browserSync.reload({stream: true});
          }, config.browserReloadDelay);
        })
        .on('start', function() {
          plg.notify('*** nodemon started');
          startBrowserSync(isDev);
        })
        .on('crash', function() {
          plg.notify('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
          plg.notify('*** nodemon exited cleanly');
        });
}

/**
 * Start BrowserSync
 * --nosync will avoid browserSync
 */

function startBrowserSync(isDev, specRunner) {
  if (args.nosync || browserSync.active) {
    return;
  }

  var options = {
    proxy:{
      target:'localhost:9000' // express' port
    },
    port: 3000, // browser-sync's port
    browser: ['google chrome'],
    files: [
        config.client + '**/*',
        config.temp + '**/*.css',
        '!' + config.sass
    ],
    open: false,
    ui: {
      port: 5050,
      weinre: {
        port: 5051
      }
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'topshelf',
    notify: true
  };

  browserSync(options);

  plg.notify('Starting BrowserSync on port 3000');

  // If build: watches the files, builds, and restarts browser-sync.
  // If dev: watches sass, compiles it to css, browser-sync handles reload
  if (isDev) {
    gulp.watch([config.sass], ['sass', 'sass-watcher', browserSync.reload])
        .on('change', changeEvent);
  } else {
    gulp.watch([config.sass, config.js, config.html],
['optimize', browserSync.reload])
        .on('change', changeEvent);
  }

}

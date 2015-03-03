'use strict';

var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    browserSync  = require('browser-sync'),
    config       = require('../gulp.config')(),
    path         = require('path'),
        chalk  = require('chalk'),
    _            = require('lodash'),
    $            = require('gulp-load-plugins')({lazy: true});

var args   = require('yargs').argv;
var envenv = $.util.env;
var port   = process.env.PORT || config.defaultPort;
// watch files for changes and reload
gulp.task('serve', ['clean:sass', 'styles', 'templates', 'nodemon'], function() {
  browserSync({
    proxy: 'http://localhost:9000',
    files: [
        config.client + '**/*',
        config.temp + '**/*.css',
        '!' + config.sass
    ],
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'topshelf',
    notify: true,
    reloadDelay: 600 //1000
  });

  gulp.watch('client/styles/**/*.scss', ['styles',browserSync.reload]);
  gulp.watch([config.templates], ['templates',browserSync.reload]);
});
/**
 * Run the spec runner
 * @return {Stream}
 */
gulp.task('serve-specs', ['build-specs'], function(done) {
    console.log('run the spec runner');
    serve(true /* isDev */, true /* specRunner */);
    done();
});
/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    console.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}
/**
 * serve the code
 * --debug-brk or --debug
 * --nosync
 * @param  {Boolean} isDev - dev or build mode
 * @param  {Boolean} specRunner - server spec runner html
 */
function serve(isDev, specRunner) {
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

    return $.nodemon(nodeOptions)
        .on('restart', ['vet'], function(ev) {
            console.log('*** nodemon restarted');
            console.log('files changed:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            console.log('*** nodemon started');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function () {
            console.log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            console.log('*** nodemon exited cleanly');
        });
}

function getNodeOptions(isDev) {
    return {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'development' : 'build'
        },
        watch: [config.server]
    };
}

function runNodeInspector() {
    console.log('Running node-inspector.');
    console.log('Browse to http://localhost:8080/debug?port=5858');
    var exec = require('child_process').exec;
    exec('node-inspector');
}
/**
 * Start BrowserSync
 * --nosync will avoid browserSync
 */
function startBrowserSync(isDev, specRunner) {
    if (args.nosync || browserSync.active) {
        return;
    }

    console.log('Starting BrowserSync on port ' + port);

    // If build: watches the files, builds, and restarts browser-sync.
    // If dev: watches less, compiles it to css, browser-sync handles reload
    if (isDev) {
        gulp.watch([config.sass], ['styles'])
            .on('change', changeEvent);
    } else {
        gulp.watch([config.sass, config.js, config.html], ['optimize', browserSync.reload])
            .on('change', changeEvent);
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        browser: 'canary',
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.sass,
            config.temp + '**/*.css'
        ] : [],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'topshelf',
        notify: true,
        reloadDelay: 0 //1000
    } ;
    if (specRunner) {
        options.startPath = config.specRunnerFile;
    }

    browserSync(options);
}
/**
 * Log. With options.
 *
 * @param {String} msg
 * @param {Object} options
 */
function log (msg, options) {
  options = options || {};
  console.log(
    (options.padding ? '\n' : '') +
    chalk.yellow(' > ' + msg) +
    (options.padding ? '\n' : '')
  );
}

'use strict';

var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    config = require('../gulp.config')(),
    path   = require('path'),
    chalk  = require('chalk'),
    glob   = require('glob'),
    args   = require('yargs').argv,
    _      = require('lodash'),
    $      = require('gulp-load-plugins')({lazy: true});

/**
 * Create a visualizer report
 */
gulp.task('plato', function(done) {
    log('Analyzing source with Plato');
    log('Browse to /report/plato/index.html to see Plato results');

    startPlatoVisualizer(done);
});

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer(done) {
    log('Running Plato');

    var files = glob.sync(config.plato.js);
    var excludeFiles = /.*\.spec\.js/;
    var plato = require('plato');

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = config.report + '/plato';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        if (args.verbose) {
            log(overview.summary);
        }
        if (done) { done(); }
    }
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

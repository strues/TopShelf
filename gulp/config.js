'use strict';
var _ = require('lodash');

global.SRC_FOLDER = 'src';
global.BUILD_FOLDER = 'build';
global.RELEASE_FOLDER = 'dist';
global.TMP_FOLDER = 'tmp';

module.exports = {
    paths: {
      conf: [
        './gulpfile.js',
        './gulp/config.js',
        './gulp/karma.conf.js'
      ],
      karmaConf: './gulp/karma.conf.js',
      pkg: './package.json',
      index: './src/index.html',
      app: './src/app',
      server: './server/**/*',
      serverSpecs: './server/**/*.spec.js',
      srcJS: [
        '!./src/**/*.spec.js',
        '!./src/app/templates.js',
        '!./src/vendor/bower/**/*.js',
        '!./src/vendor/other/**/*.js',
        './src/app/**/*.js'
      ],
      srcTest: [
        '!./src/vendor/bower/*',
        './src/**/*.spec.js'
      ],
      srcTmpl: [
        '!./src/index.html',
        './src/**/*.tpl.html'
      ],
      srcSass: [
        './src/styles/**/*.scss',
        './src/app/**/*.scss'
      ],
      srcAssets: './src/asssets',
      srcImages: './src/asssets/images/**/*',
      srcFonts: './src/asssets/fonts/**/*',

      vendorJS: [
        '!./src/vendor/bower/**/*.min.js',
        '!./src/vendor/bower/jquery/**/*.js',
        '!./src/vendor/bower/bootstrap-sass-official/**/*.js',
        '!./src/vendor/bower/angular-scenario/*.js',
        '!./src/vendor/bower/angular-mocks/*.js',
        '!./src/vendor/bower/angular-ui-router/src/*.js',
        './src/vendor/bower/**/*.js',
        './src/vendor/other/**/*.js'
      ],
      vendorCSS: [
        '!./src/vendor/bower/**/*.min.css',
        '!./src/vendor/bower/bootstrap-sass-official/**/*.{css, scss}',
        '!./src/vendor/bower/angular/angular-csp.css',
        './src/vendor/bower/**/*.css'
      ],
      dist: './dist/public',
      distHTML: './dist/public/',
      distJS: './dist/public/js',
      distCSS: './dist/public/',
      distAssets: './dist/public/assets',
      distImages: './dist/public/assets/images/',
      distFonts: './dist/public/assets/fonts',
      distServer: './dist/server'
    }
};

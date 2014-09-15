'use strict';
var _ = require('lodash');

module.exports = {
    paths: {
      app:{
          pkg: './package.json',
          server: './server/**/*',
          html: './src/index.html',
          js: [
            './src/app/app.js',
            './src/app/**/*.js'
          ],
          test: [
            '!./src/vendor/bower/**/*',
            './src/app/**/*.spec.js'
          ],
          tmpl: [
            '!./src/index.html',
            './src/common/**/*.tpl.html',
            './src/app/**/*.tpl.html'
          ],
          sass: [
            './src/styles/**/*.scss',
            './src/app/**/*.scss'
          ],
          img: './src/asssets/images/*.{png,jpg}',
          fonts: './src/asssets/fonts/**/*.{eot,otf,svg,ttf,woff}',
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
          ]
        },
    dist:{
      root: './dist/public',
      js: './dist/public/js',
      css: './dist/public/css',
      img: './dist/public/assets/images',
      fonts: './dist/public/assets/fonts',
      vendor: './dist/public/vendor',
      server: './dist/server'
    }
  }
};

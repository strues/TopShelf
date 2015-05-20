'use strict';
module.exports = function() {

  var client         = './src/client/';
  var server         = './src/server/';
  var clientApp      = client + 'app/';
  var report         = './docs/';
  var doc                    = './docs/';
  var root           = './';
  var specRunnerFile = 'specs.html';
  var temp           = './.tmp/';
  var bower = {
    json: require('../bower.json'),
    directory: './bower_components/',
    ignorePath: '../..'
  };

  var config = {
    alljs: [
    './src/**/*.js',
    './*.js'
    ],
    build: './build/',
    client: client,
    css: temp + 'style.css',
    cssVend: temp + 'lib.css',
    fonts: client + 'fonts/**/*.*',
    html: client + '**/*.html',
    htmltemplates: clientApp + '**/*.tpl.html',
    images: client + 'img/**/*.{png,jpg}',
    index: client + 'index.html',
    // app js, with no specs
    js: [
    clientApp + '**/*.module.js',
    clientApp + '**/*.config.js',
    clientApp + '**/*.controller.js',
    clientApp + '**/*.js',
    '!' + clientApp + '**/*.spec.js'
    ],
    jsOrder: [
    '**/app.module.js',
    '**/*.module.js',
    '**/*.js'
    ],
    sass: client + 'styles/**/*.scss',
    report: report,
    root: root,
    server: server,
    source: 'src/',
    temp: temp,

    optimized: {
      app: 'app.js',
      lib: 'lib.js'
    },
    e2e: './e2e',
    wiredep: {
      directory: 'bower_components',
      exclude: [/bootstrap-sass-official\/.*\.js/, /bootstrap\.css/]
    },

    plato: {js: clientApp + '**/*.js'},

    browserReloadDelay: 1000,
    templateCache: {
      file: 'templates.js',
      options: {
        module: 'app.core',
        root: 'app/',
        standAlone: false
      }
    },

    bower: bower,
    packages: [
    '../package.json',
    '../bower.json'
    ],
    specRunner: client + specRunnerFile,
    specRunnerFile: specRunnerFile,

    nodeServer: './src/server/app.js',
    defaultPort: '9000'
  };

  return config;

};

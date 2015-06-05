module.exports = function()
{

  var client = './src/client/';
  var server = './src/server/';
  var build = './build/';
  var ngApp = client + 'app/';
  var report = './report/';
  var root = './';
  var specRunnerFile = 'specs.html';
  var temp = './.tmp/';
  var wiredep = require('wiredep');
  var bowerFiles = wiredep(
  {
    devDependencies: true
  })['js'];
  var bower = {
    json: require('../bower.json'),
    directory: '../bower_components/',
    ignorePath: '../..'
  };
  var nodeModules = 'node_modules';

  var config = {
    client: client,
    server: server,
    build: build,
    temp: temp,
    root: root,
    report: report,
    ngApp: ngApp,

    alljs: [
      ngApp + '**/*.js',
      server + '**/*.js'
    ],
    jsOrder: [
      '**/app.module.js',
      '**/*.module.js',
      '**/*.js'
    ],
    css: temp + 'style.css',
    fonts: client + 'fonts/**/*.*',
    html: ngApp + '**/*.html',
    images: client + 'img/**/*.{jpg,png,gif,svg}',
    index: client + 'index.html',
    // app js, with no specs
    js: [
      ngApp + '**/*.module.js',
      ngApp + '**/*.js',
      '!' + ngApp + '**/*.spec.js',
      '!' + ngApp + '**/*.mock.js'
    ],
    sass: client + 'styles/**/*.scss',
    source: './src/',
    stubsjs: [
      bower.directory + 'angular-mocks/angular-mocks.js',
      client + 'stubs/**/*.js'
    ],

    /**
     * optimized files
     */
    optimized:
    {
      app: 'app.js',
      lib: 'lib.js'
    },

    /**
     * plato
     */
    plato:
    {
      js: ngApp + '**/*.js'
    },

    /**
     * browser sync
     */
    browserReloadDelay: 1000,

    /**
     * Bower and NPM files
     */
    bower: bower,
    packages: [
      './package.json',
      './bower.json'
    ],
    templateCache:
    {
      file: 'templates.js',
      options:
      {
        module: 'app.core',
        root: 'app/',
        standAlone: false
      }
    },

    /**
     * specs.html, our HTML spec runner
     */
    specRunner: client + specRunnerFile,
    specRunnerFile: specRunnerFile,

    /**
     * The sequence of the injections into specs.html:
     *  1 testlibraries
     *      mocha setup
     *  2 bower
     *  3 js
     *  4 spechelpers
     *  5 specs
     *  6 templates
     */
    testlibraries: [
      nodeModules + '/mocha/mocha.js',
      nodeModules + '/chai/chai.js',
      nodeModules + '/mocha-clean/index.js',
      nodeModules + '/sinon-chai/lib/sinon-chai.js'
    ],
    specHelpers: [root + 'test-helpers/*.js'],
    specs: [ngApp + '**/*.spec.js'],
    serverIntegrationSpecs: [root +
      '/tests/server-integration/**/*.spec.js'
    ],

    /**
     * Node settings
     */
    nodeServer: './src/server/app.js',
    defaultPort: '9000'
  };

  /**
   * wiredep and bower settings
   */
  config.getWiredepDefaultOptions = function()
  {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  /**
   * karma settings
   */
  config.karma = getKarmaOptions();

  return config;

  ////////////////

  function getKarmaOptions()
  {
    var options = {
      files: [].concat(
        bowerFiles,
        config.specHelpers,
        ngApp + '**/*.module.js',
        ngApp + '**/*.js',
        temp + 'partials.min.js',
        config.serverIntegrationSpecs
      ),
      exclude: [],
      coverage:
      {
        dir: report + 'coverage',
        reporters: [
          // reporters not supporting the `file` property
          {
            type: 'html',
            subdir: 'report-html'
          },
          {
            type: 'lcov',
            subdir: 'report-lcov'
          },
          // reporters supporting the `file` property, use `subdir` to directly
          // output them in the `dir` directory.
          // omit `file` to output to the console.
          // {type: 'cobertura', subdir: '.', file: 'cobertura.txt'},
          // {type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt'},
          // {type: 'teamcity', subdir: '.', file: 'teamcity.txt'},
          //{type: 'text'}, //, subdir: '.', file: 'text.txt'},
          {
            type: 'text-summary'
          } //, subdir: '.', file: 'text-summary.txt'}
        ]
      },
      preprocessors:
      {}
    };
    options.preprocessors[ngApp + '**/!(*.spec)+(.js)'] = ['coverage'];
    return options;
  }
};

'use strict';

module.exports = function() {
    var client = './client/';
    var server = './server/';
    var clientApp = client + 'app/';
    var root = './';
    var specRunnerFile = 'specs.html';
    var temp = './.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];

    var config = {
        root: root,
        client: client,
        server: server,
        htmltemplates: clientApp + '**/*.tpl.html',
        css: temp + '/app.css',
        sass: client + ['/styles/styles.scss', '/styles/**/*.scss'],
        html: client + '/**/*.html',
        index: client + '/index.html',
        js: [
            clientApp + 'app.js',
            clientApp + '/**/*.module.js',
            clientApp + '/**/*.config.js',
            clientApp + '/**/*.controller.js',
            clientApp + '/**/*.service.js',
            clientApp + '/**/*.directive.js',
            clientApp + '/**/*.js',
            '!' + clientApp + '/**/*.spec.js'
        ],
        specs: [clientApp + '/**/*.spec.js'],
        alljs: [
            './client/**/*.js',
            './*.js'
        ],
        plato: {
            js: clientApp + '/**/*.js'
        },
        fonts: ['./lib/font-awesome/fonts/**/*.*',
                client + 'assets/fonts/*.*',
                './lib/bootstrap-sass-official/assets/fonts/bootstrap/*.*'],
        images: client + 'assets/images/**/*.*',
        dist: './dist/',
        temp: temp,
        report: './report/',
        nodeServer: './server/server.js',
        defaultPort: '9000',
        templateCache: {
            module: 'topshelf.core',
            file: 'templates.js'
        },
        bower: {
            directory: './lib/',
            ignorePath: '../..'
        },
             packages: [
            './package.json',
            './bower.json'
        ],

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
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ],
        specHelpers: [client + 'test-helpers/*.js'],
        serverIntegrationSpecs: [],
    };
    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultOptions = function() {
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
    config.karma = {
        files: [].concat(
            bowerFiles,
            config.specHelpers,
            clientApp + 'app.js',
            clientApp + '/**/*.js',
            clientApp + '/**/*.config.js',
            clientApp + '/**/*.controller.js',
            clientApp + '/**/*.service.js',
            clientApp + '/**/*.directive.js',
            config.templateCache.path + config.templateCache.file),
        preprocessors: {}
    };
    config.karma.preprocessors['{' + clientApp + ',' +
                               clientApp + '**/!(*.spec).js}'] = 'coverage';

    return config;
};

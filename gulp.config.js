'use strict';

module.exports = function() {
    var client = './client/';
    var server = './server/';
    var clientApp = client + 'app/';
    var root = './';
    var specRunnerFile = 'specs.html';
    var temp = './.tmp/';

    var config = {
        root: root,
        client: client,
        server: server,
        htmltemplates: clientApp + '/**/*.tpl.html',
        css: temp + '/app.css',
        sass: client + '/styles/app.scss',
        html: client + '/**/*.html',
        index: client + '/index.html',
        js: [
            clientApp + 'app.js',
            clientApp + '/**/*.js',
            clientApp + '/**/*.config.js',
            clientApp + '/**/*.controller.js',
            clientApp + '/**/*.service.js',
            clientApp + '/**/*.directive.js',
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
        build: './build/',
        dist: './dist/',
        temp: temp,
        report: './report/',

        specHelpers: [client + '/test-helpers/*.js'],
        specRunner: client + specRunnerFile,
        specRunnerFile: specRunnerFile,
        midwaySpecs: client + '/test/midway/**/*.spec.js',
        testlibraries: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'node_modules/mocha-clean/index.js',
            'node_modules/sinon-chai/lib/sinon-chai.js'
        ],

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
        ]
    };

    return config;
};

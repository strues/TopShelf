    var src = './src/';
    var client = src + 'client/';
    var server = src + 'server/';
    var build = './build/';
    var buildC = build + 'client/';
    var ngApp = client + 'app/';
    var docu = './docs/';
    var report = docu + 'report/';
    var root = './';
    var assets = client + 'assets/';
    var temp = root + '.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];
    var bower = {
        json: require('../bower.json'),
        directory: '../bower_components/',
        ignorePath: '../..'
    };
    var nodeModules = root + 'node_modules';

module.exports = function() {
    var config = {
        src: src,
        client: client,
        server: server,
        build: build,
        docu: docu,
        assets: assets,
        temp: temp,
        root: root,
        buildC: buildC,
        report: report,
        ngApp: ngApp,
        alljs: [
            ngApp + '**/*.js',
            server + '**/*.js'
        ],
        serverJS: [server + '**/*.js', !server + '**/*.*.spec.js'],
        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],
        css: temp + 'style.css',
        font: assets + 'font/**/*.*',
        html: ngApp + '**/*.html',
        images: assets + 'img/**/*.{jpg,png,gif,svg}',
        index: client + 'index.html',
        // app js, with no specs
        js: [
            ngApp + '**/*.module.js',
            ngApp + '**/*.js',
            temp + 'templates.js',
            '!' + ngApp + '**/*.spec.js',
            '!' + ngApp + '**/*.mock.js'
        ],
        sass: client + 'styles/**/*.scss',
        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * plato
         */
        plato: {
            js: ngApp + '**/*.js'
        },

        /**
         * browser sync
         */
        browserReloadDelay: 500,

        /**
         * Bower and NPM files
         */
        bower: bower,
        packages: [
          root + 'package.json',
           root + 'bower.json'
        ],
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                root: 'app/',
                standAlone: false
            }
        },
        /**
         * Node settings
         */
        nodeServer: './src/server/app.js',
        defaultPort: '9000'
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
    return config;
};

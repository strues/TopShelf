var os = require('os');
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var wireDepStream = require('wiredep').stream;
var jsHintStylish = require('jshint-stylish');
var $ = require('gulp-load-plugins')();

var devConfigPath = './gulpfile-dev.js';
var devConfig = {};

if (fs.existsSync(devConfigPath)) {
    devConfig = require(devConfigPath)
}
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var gulpArguments = process.argv.splice(2);
var ENV = process.env.NODE_ENV || 'dev';
var isDev = ENV === 'dev';
var configFilename = 'config.' + (isDev ? 'dev' : 'prod') + '.js';
var templateCacheModuleName = 'app.templates';







var browserApp = (function () {
    //also can be 'firefox'
    var platformBrowserApp;

    switch (os.platform()) {
        case 'linux':
            platformBrowserApp = 'google-chrome';
            break;
        case 'darwin':
            platformBrowserApp = 'open /Applications/Google\\ Chrome.app';
            break;
        case 'win32':
            platformBrowserApp = 'chrome';
            break;
        default:
            $.util.log($.util.colors.red('Unsupported dev platform'));
            process.exit();
            break;
    }

    return devConfig.browser || platformBrowserApp;
})();
var polyfillsBrowsers = [
    'last 2 version',
    'ie 8',
    'ie 9'
];
var prefixesBrowsers = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 20',
    'Firefox >= 24', // Firefox 24 is the latest ESR
    'Explorer >= 8',
    'iOS >= 6',
    'Opera >= 12',
    'Safari >= 6'
];
var folders = {
    src: 'client',
    app: path.join('src', 'app'),
    indexFile: path.join('src', 'index.html'),
    appAssets: path.join('src', 'assets'),
    appModules: path.join('src', 'app/**'),
    appViews: path.join('src', 'app/**/*.tpl.html'),
    dev: path.join('built', 'dev'),
    prod: path.join('built', 'prod')
};
var buildFolder = isDev && gulpArguments[0] !== 'build'
    ? folders.dev
    : folders.prod;
var plumberConfig = {
    errorHandler: function (err) {
        $.util.log($.util.colors.red(err.toString()));
        $.util.beep();
    }
};

/****************                ****************/
/****************   MAIN TASKS   ****************/
/****************                ****************/
gulp.task('default', ['clean'], function () {
    'use strict';

    isDev
        ? gulp.start('build-flow', 'open-browser', 'watchers')
        : gulp.start('build', 'open-browser');
});

gulp.task('build', ['clean', 'nodemon'], function () {
    'use strict';

    gulp.start('prod:full-flow');
});

gulp.task('release', ['bump'], function () {
    'use strict';

    gulp.start('release-push');
});

gulp.task('csscomb', function () {
    'use strict';

    var CssComb = require('csscomb');
    var comb = new CssComb(JSON.parse(fs.readFileSync('.csscomb.json')));
    comb.processPath(path.join(folders.appAssets, 'styles'));
});

gulp.task('test', function () {
    'use strict';
    
    return gulp.src('client/app/**/*.js')
     .pipe($.jshint())
        .pipe($.jshint.reporter(jsHintStylish))
        .pipe($.plato('report'))
        .pipe($.notify(function (file) {
            if (file.jshint.success) {
                return false;
            }

            var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                    return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
            }).join('\n');

            return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
        }));
});


/****************               ****************/
/****************   COMMON TASKS   ****************/
/****************               ****************/
gulp.task('build-flow', ['process-index', 'process-sass', 'process-assets']);

gulp.task('clean', function () {
    'use strict';

    return gulp.src([
        path.join(buildFolder, '*'),
        path.join(buildFolder, 'js'),
        path.join(buildFolder, 'styles'),
        path.join(buildFolder, 'images')
    ], { read: false })
        .pipe($.plumber(plumberConfig))
        .pipe($.rimraf());
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    verbose: true,
    script: 'server/app.js',
    ext: 'js html scss',
    ignore: ['vendors', 'node_modules', '.sass-cache', '.idea', '.git']
  }).on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
});



gulp.task('server', [isDev ? 'build-flow': 'prod:full-flow', 'nodemon'], function () {

    var notification = 'Dev server was started on: http://' +
        (isPublicServer ? 'localhost' : server.host) + ':' + server.port;

    return gulp.src(buildFolder)
        .pipe($.plumber(plumberConfig))
        .pipe($.notify(notification))
});

gulp.task('open-browser', ['server'], function () {
    'use strict';

    if (gulpArguments.indexOf('--not-open') === -1) {
        gulp.src(buildFolder + '/index.html')
            .pipe($.open('', {
                url: 'http://' + (isPublicServer ? 'localhost' : server.host) + ':' + server.port,
                app: browserApp
            }));
    }
});
  

gulp.task('watchers', function () {
    'use strict';

    gulp.watch([
        path.join(folders.appAssets, 'styles', '**', '*.+(scss|css)'),
        path.join(folders.appModules, '**', '*.+(scss|css)')
    ], ['process-sass']);

    gulp.watch([
        path.join(folders.app, '**', '*.js'),
        '!' + path.join(folders.app, 'config', configFilename)
        ], [
            'process-app-polyfills',
            'process-app-js'
        ]);
    gulp.watch(path.join(folders.app, 'config', configFilename), ['process-app-config']);
    gulp.watch(folders.indexFile, ['process-index']);
    gulp.watch(path.join(folders.appViews, '**', '*.html'), ['process-app-templates']);
    gulp.watch(path.join(folders.appAssets, 'images', '**', '*.*'), ['process-assets-images']);
    gulp.watch(path.join(folders.src, 'favicon.ico'), ['process-assets-favicon']);
    gulp.watch(path.join(folders.appAssets, 'fonts', '**', '*.*'), ['process-assets-fonts']);
});

gulp.task('process-app-polyfills', function () {
    'use strict';

    return gulp.src(path.join(folders.app, '**'))
        .pipe($.plumber(plumberConfig))
        .pipe($.autopolyfiller('polyfills.js', { browsers: polyfillsBrowsers }))
        .pipe(gulp.dest(path.join(buildFolder, 'js')));
});

gulp.task('process-app-config', function () {
    'use strict';

    return gulp.src(path.join(folders.app, 'config', configFilename))
        .pipe($.plumber(plumberConfig))
        .pipe($.rename('config.js'))
        .pipe($.jshint())
        .pipe($.jshint.reporter(jsHintStylish))
        .pipe($.plato('report'))
        .pipe($.notify(function (file) {
            if (file.jshint.success) {
                return false;
            }

            var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                    return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
            }).join('\n');

            return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
        }))
        .pipe(gulp.dest(path.join(buildFolder, 'js')))
        .pipe(livereload());
});

gulp.task('process-app-templates', function () {
    'use strict';

    return gulp.src(path.join(folders.appViews, '**', '*.html'))
        .pipe($.plumber(plumberConfig))
        .pipe($.angularHtmlify())
        .pipe($.cleanhtml())
        .pipe($.angularTemplatecache({
            standalone: true,
            module: templateCacheModuleName,
            root: '/templates/'
        }))
        .pipe(gulp.dest(path.join(buildFolder, 'js')))
        .pipe(livereload());
});


gulp.task('process-app-js', function () {
    'use strict';

    return gulp.src(folders.indexFile)
        .pipe($.plumber(plumberConfig))
        .pipe($.useref.assets())
        .pipe($.filter(function (file) {
            return /app\.js$/.test(file.path);
        }))
        .pipe($.jshint())
        .pipe($.jshint.reporter(jsHintStylish))
        .pipe($.notify(function (file) {
            if (file.jshint.success) {
                return false;
            }

            var errors = file.jshint.results.map(function (data) {
                if (data.error) {
                    return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                }
            }).join('\n');

            return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
        }))
        .pipe($.size({title: 'Original app sources size: '}))
        .pipe($.ngAnnotate())
        .pipe($.size({title: 'Compressed app sources size: '}))
        .pipe(gulp.dest(buildFolder))
        .pipe(livereload());
});

gulp.task('process-vendors-js', function () {
    'use strict';

    return gulp.src(folders.indexFile)
        .pipe($.plumber(plumberConfig))
        .pipe(wireDepStream())
        .pipe($.useref.assets())
        .pipe($.filter(function (file) {
            return /vendors\.js$/.test(file.path);
        }))
        .pipe($.size({title: 'Original vendors size: '}))
        .pipe($.uglifyjs())
        .pipe($.size({title: 'Compressed vendors size: '}))
        .pipe(gulp.dest(buildFolder));
});

gulp.task('process-index', [
        'process-app-polyfills',
        'process-app-config',
        'process-app-templates',
        'process-app-js',
        'process-vendors-js'
    ], function () {
        'use strict';

        return gulp.src(folders.indexFile)
            .pipe($.plumber(plumberConfig))
            .pipe($.useref())
            .pipe($.angularHtmlify())
            .pipe($.cleanhtml())
            .pipe(gulp.dest(buildFolder))
            .pipe(livereload());
    });

gulp.task('process-sass', function () {
    'use strict';

    return gulp.src('client/styles/app.scss')
        .pipe($.plumber(plumberConfig))
        .pipe($.sass())
        .pipe($.cssimport())
        .pipe($.size({title: 'Original app styles size: '}))
        .pipe($.autoprefixer(prefixesBrowsers))
        .pipe($.csso())
        .pipe($.rename({
            basename: 'app'
        }))
        .pipe($.size({title: 'Compressed app styles size: '}))
        .pipe(gulp.dest(path.join(buildFolder, 'styles')))
        .pipe(livereload());
});

gulp.task('process-assets-images', function () {
    'use strict';

    return gulp.src(path.join(folders.appAssets, 'images', '**', '*.*'))
        .pipe(gulp.dest(path.join(buildFolder, 'images')));
});

gulp.task('process-assets-favicon', function () {
    'use strict';

    return gulp.src(path.join(folders.src, 'favicon.ico'))
        .pipe(gulp.dest(buildFolder));
});

gulp.task('process-assets-fonts', function () {
    'use strict';

    return gulp.src(path.join(folders.appAssets, 'fonts', '**', '*.*'))
        .pipe(gulp.dest(path.join(buildFolder, 'fonts')));
});

gulp.task('process-assets', ['process-assets-images', 'process-assets-favicon', 'process-assets-fonts']);


/****************               ****************/
/****************   PROD TASKS   ****************/
/****************               ****************/
gulp.task('prod:process-index', [
    'process-app-polyfills',
    'process-app-config',
    'process-app-templates',
    'process-app-js',
    'process-vendors-js'
], function () {
    'use strict';

    return gulp.src(folders.indexFile)
        .pipe($.plumber(plumberConfig))
        .pipe($.useref())
        .pipe(gulp.dest(buildFolder));
});

gulp.task('prod:process-assets-images', function () {
    'use strict';

    return gulp.src(path.join(folders.appAssets, 'images', '**', '*.*'))
        .pipe($.size('Images size before compression'))
        .pipe($.imagemin({
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe($.size('Images size after compression'))
        .pipe(gulp.dest(path.join(buildFolder, 'images')));
});

gulp.task('prod:concat-app-js', [
        'prod:process-index',
        'process-sass',
        'prod:process-assets-images',
        'process-assets-favicon',
        'process-assets-fonts'
    ], function () {
        'use strict';

        function getConcatPath(files) {
            var jsDirPath = path.join(buildFolder, 'js');
            var total = [];

            for (var i = 0, length = files.length; i < length; i++) {
                total.push(path.join(jsDirPath, files[i]));
            }

            return total;
        }

        return gulp.src(getConcatPath(['polyfills.js', 'config.js', 'templates.js', 'app.js']))
            .pipe($.concat('all.js'))
            .pipe($.uglifyjs())
            .pipe(gulp.dest(path.join(buildFolder, 'js')))
    });


gulp.task('prod:replace-concatenated-js-path', ['prod:concat-app-js'], function () {
    'use strict';

    return gulp.src(path.join(buildFolder, 'index.html'))
        .pipe($.replace(
            /<!--\s*prod-app-js:start\(([.\/\w]+)\)\s*-->((?:\s|.)+)<!--\s*prod-app-js:end\s*-->/,
            '<script src="$1"></script>'
        ))
        .pipe($.angularHtmlify())
        .pipe($.cleanhtml())
        .pipe(gulp.dest(buildFolder));
});

gulp.task('prod:revisioning-assets', ['prod:replace-concatenated-js-path'], function () {
        'use strict';

        return gulp.src(path.join(buildFolder, '**'))
            .pipe($.revAll({
                ignore: [/^\/favicon.ico$/g, /^\/index.html/g]
            }))
            .pipe(gulp.dest(buildFolder));
    }
);


gulp.task('prod:full-flow', ['prod:revisioning-assets'], function () {
    'use strict';

    var includes = [
        /(app|config|polyfills|templates).\w{8}\.js$/
    ];
    var includesLength = includes.length;
    var excludes = [
        /index\.html$/, //main index file
        /favicon\.ico$/, //website favicon
        /([-\w.]+)\.\w{8}\.[\w]{2,}$/
    ];
    var excludesLength = excludes.length;

    function notRemove(filePath) {
        var i;

        for (i = 0; i < includesLength; i++) {
            if (includes[i].test(path.basename(filePath))) {
                return false;
            }
        }

        for (i = 0; i < excludesLength; i++) {
            if (excludes[i].test(path.basename(filePath))) {
                return true;
            }
        }

        return false;
    }

    //clear unnecessary files
    return gulp.src(path.join(buildFolder, '**'))
        .pipe($.filter(function (file) {
            console.log(file.path);
            return !fs.statSync(file.path).isDirectory() && !notRemove(file.path);
        }))
        .pipe($.rimraf());
});



/****************                       ****************/
/****************   NEW RELEASE TASKS   ****************/
/****************                       ****************/

function getBumpedVersion(file, key) {
    'use strict';

    file = file || './package.json';
    key = key || 'version';

    var cached = null;

    if (cached === null) {
        cached = JSON.parse(fs.readFileSync(file))[key];
    }

    return cached;
}

gulp.task('release-push', ['release-tag'], function () {
    'use strict';

    if (gulpArguments.indexOf('--not-push') === -1) {
        $.git.push('origin', 'master', {args: '--tags'}).end();
    }
});


gulp.task('release-tag', ['release-commit'], function (cb) {
    'use strict';

    var version = 'v' + getBumpedVersion();
    var message = 'Release ' + version;

    $.git.tag(version, message);
    cb();
});

gulp.task('release-commit', function () {
    'use strict';

    var version = 'v' + getBumpedVersion();
    var message = 'Release ' + version;

    return gulp.src('./')
        .pipe($.git.add())
        .pipe($.git.commit(message))
        .pipe($.git.checkout('HEAD'));
});

gulp.task('bump', function (cb) {
    'use strict';

    var type;
    var allowedTypes = ['major', 'minor', 'patch', 'prerelease'];

    if (!gulpArguments[1]) {
        cb('You must specify release type. You can use this types: \'' + allowedTypes.join('\', \'') + '\'.');
        return;
    }

    type = allowedTypes.indexOf(gulpArguments[1].replace(/^--/g, ''));

    if (type === -1) {
        cb('Not allowed release type, You can use this types: \'' + allowedTypes.join('\', \'') + '\'.');
        return;
    }

    return gulp.src('package.json')
        .pipe($.bump({ type: allowedTypes[type] }))
        .pipe(gulp.dest('.'));
});

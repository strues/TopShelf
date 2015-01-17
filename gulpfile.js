var args        = require('yargs').argv,
    gulp        = require('gulp'),
    del         = require('del'),
    glob        = require('glob'),
    config      = require('./gulp.config')(),
    chalk       = require('chalk'),
    bowerFiles  = require('main-bower-files'),
    runSequence = require('run-sequence'),
    sq          = require('streamqueue'),
    path        = require('path'),
    _           = require('lodash'),
    $           = require('gulp-load-plugins')({lazy: true}),
    colors      = $.util.colors,
    envenv      = $.util.env;

process.env.NODE_ENV = $.util.env.env || 'development';

gulp.task('help', $.taskListing);

var openOpts = {
  url: 'http://localhost:' + config.defaultPort
};

var toInject = config.js;

var toDelete = [];

/**
 * Compile Sass
 */
gulp.task('sass', function () {
    log('Compiling Sass files to CSS');
    return gulp
        .src(config.sass)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.autoprefixer({
                browsers: ['last 2 versions']
            }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('client/styles/css'))
        .pipe($.livereload());
});

gulp.task('optimize-css', ['sass'], function () {
    log('Optimizing the CSS for dist');
    return gulp
        .src('client/styles/css/styles.css')
        .pipe($.plumber())
        // .pipe($.uncss({
        //    html: glob.sync('client/**/*.tpl.html')
        // }))
        .pipe($.csso())
    .pipe(gulp.dest('dist/client/'));
});
/**
 * BUILD JS FILES
 */

gulp.task('scripts', function () {
    log('Creating Angular templatecache');

    var tpl = gulp.src('client/**/*.tpl.html')
            .pipe($.bytediff.start())
            .pipe($.minifyHtml({empty: true}))
            .pipe($.if(args.verbose, $.bytediff.stop(bytediffFormatter)))
            .pipe($.angularTemplatecache(config.templateCache.file, {
                module: config.templateCache.module,
                standalone: false,
                root: config.templateCache.root
            }));

    var app = gulp.src('dist/client/app.js');
    log('Running Concat, ngAnotate and Uglifying JS');
    return sq({
        objectMode: true
        }, app, tpl
    )
    .pipe($.if(args.verbose, $.bytediff.stop(bytediffFormatter)))
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe($.ngAnnotate({add: true}))
    .pipe($.uglify())
    .pipe(getHeader())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/client/'));
});

/**
 * Inject css/js files in index.html
 */
gulp.task('inject', ['sass'], function () {
    log('Injecting CSS files');

    var sources = gulp.src(toInject, {read: false});

    return gulp.src('client/index.html')
    .pipe($.inject(gulp.src(bowerFiles(), {read: false}), {
      name: 'bower',
      relative: 'true'
    }))
    .pipe($.inject(sources, {relative: true}))
    .pipe(gulp.dest(config.client))
    .pipe($.livereload());
});

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts');
    return gulp.src(config.fonts)
        .pipe(gulp.dest(config.dist + 'client/assets/fonts'));
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', ['clean-images'], function() {
    var dest = config.dist + 'client/assets/images';
    log('Compressing and copying images');
    return gulp.src(config.images)
        .pipe($.imagemin({
            optimizationLevel: 4
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('copy:dist', function () {
    var main = gulp.src(['server/**/*', 'package.json'], {base: './'});
    var assets = gulp.src('client/assets/**/*', {base: './'});

    return sq({
        objectMode: true
        }, main, assets
    )
    .pipe(gulp.dest('dist/'));
});

gulp.task('usemin', ['inject'], function () {
    return gulp
        .src('client/index.html')
        .pipe($.plumber())
        .pipe($.usemin())
        .pipe(gulp.dest('dist/client/'));
});

gulp.task('replace', function () {
    return gulp
        .src('dist/client/index.html')
        .pipe($.replace(/<script.*livereload.*><\/script>\n*/, ''))
        .pipe(gulp.dest('dist/client'));
});

gulp.task('rev', function () {
    return gulp
        .src('dist/client/**')
        .pipe($.revAll({
          ignore: ['favicon.ico', '.html'],
          quiet: true,
          transformFilename: function (file, hash) {
              toDelete.push(path.resolve(file.path));
              var ext = path.extname(file.path);
              return path.basename(file.path, ext) + '.' + hash.substr(0, 8) + ext;
          }
        }))
        .pipe($.revReplace())
        .pipe(gulp.dest('dist/client/'));
});

/**
 * BUILD TASK
 */

gulp.task('build', function (cb) {
    runSequence(
    ['clean', 'optimize-css', 'images', 'fonts'],
    ['usemin', 'copy:dist'],
    ['replace', 'scripts'],
    'rev',
    cb);
});

gulp.task('open', ['serve'], function () {
    gulp
        .src('client/index.html')
        .pipe($.open('', openOpts));
});

/**
 * Watch files and reload page.
 * Recompile scss if needed.
 * Reinject files
 */
gulp.task('watch', ['inject'], function () {
    log('Watching files for changes.');

    $.livereload.listen();

    gulp.watch('bower.json', function () {
        gulp
            .src('client/index.html')
              .pipe($.inject(gulp.src(bowerFiles(), {
                read: false
                }), {
                name: 'bower',
                relative: 'true'
                }))
              .pipe(gulp.dest('client'))
              .pipe($.livereload());
    });

    gulp
        .watch([config.index, config.js, config.sass, config.htmltemplates])
        .on('change', $.livereload);

    $.watch(config.sass, function () {
        gulp
            .src(['client/styles/styles.scss', 'client/styles/**/*.scss'])
              .pipe($.plumber())
              .pipe($.sass())
              .pipe(gulp.dest('client/styles/css'));
    });

    $.watch(config.js, function () {
        gulp
            .src('client/index.html')
              .pipe($.inject(gulp.src(toInject), {relative: true}))
              .pipe(gulp.dest('client'));
    });
});

/**
 * LAUNCH EXPRESS SERVER W/ NODEMON
 */
gulp.task('serve', ['watch'], function (cb) {

    var called = false; // callback variable
    return $.nodemon({
        script: 'server/server.js',
        ext: 'js',
        ignore: ['client', 'dist', 'node_modules'],
        watch: ['server.js', 'server/**/*.*']
      })
    .on('start', function onStart() {
        if (!called) {
            cb();
        }
        called = true;
    })
    .on('restart', function onRestart () {
        gulp
            .src('client/index.html')
            .pipe($.wait(50))
            .pipe($.livereload());
    });
});

gulp.task('default', ['open']);

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' +
        (data.endSize / 1000).toFixed(2) + ' kB and is ' +
        formatPercent(1 - data.percent, 2) + '%' + difference;
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

/**
 * Log an error message and emit the end of a task
 */
function errorLogger(error) {
    log('*** Start of Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted perentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}

/**
 * Format and return the header for files
 * @return {String}           Formatted file header
 */
function getHeader() {
    var pkg = require('./package.json');
    var template = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @authors <%= pkg.authors %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''
    ].join('\n');
    return $.header(template, {
        pkg: pkg
    });
}

/**
 * Get the default options for wiredep
 */
function getWiredepDefaultOptions() {
    var options = {
        bowerJson: require('./bower.json'),
        directory: config.bower.directory,
        ignorePath: config.bower.ignorePath
    };
    return options;
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

/**
 * Show OS level notification using node-notifier
 */
function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle'
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
}

/**
 *
 * **** CLEANING TASKS ****
 *
 ************************************/

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

/**
 * Remove all files from the dist, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean', function(done) {
    var delconfig = [].concat(config.dist, config.temp, config.report);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

/**
 * Remove all fonts from the dist folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-fonts', function(done) {
    clean([].concat(config.dist + 'client/assets/fonts/**/*.*'), done);
});

/**
 * Remove all images from the dist folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-images', function(done) {
    clean([].concat(config.dist + 'client/assets/images/**/*.*'), done);
});

/**
 * Remove all styles from the dist and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function(done) {
    var files = [].concat(
        config.temp + '**/*.css',
        config.dist + 'styles/**/*.css'
    );
    clean(files, done);
});

/**
 * Remove all js and html from the dist and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.dist + 'js/**/*.js',
        config.dist + '**/*.html'
    );
    clean(files, done);
});

/**
 *
 * **** CODE QUALITY CONTROL ****
 *
 ************************************/

/**
 * Create a visualizer report
 */
gulp.task('plato', function(done) {
    log('Analyzing source with Plato');

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
 * Lint the code and create coverage report
 * @return {Stream}
 */
gulp.task('analyze', ['plato'], function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.js)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'))
        .pipe($.jscs());
});

/**
 * Tests
 */
/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
function startTests(singleRun, done) {
    var child;
    var excludeFiles = [];
    var fork = require('child_process').fork;
    var karma = require('karma').server;
    var serverSpecs = config.serverIntegrationSpecs;

    if (args.startServers) {
        log('Starting servers');
        var savedEnv = process.env;
        savedEnv.NODE_ENV = 'dev';
        savedEnv.PORT = 8888;
        child = fork(config.nodeServer);
    } else {
        if (serverSpecs && serverSpecs.length) {
            log('excluding server-integration tests: ' + serverSpecs);
            excludeFiles = serverSpecs;
        }
    }

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    ////////////////

    function karmaCompleted(karmaResult) {
        log('Karma completed');
        if (child) {
            log('shutting down the child process');
            child.kill();
        }
        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        } else {
            done();
        }
    }
}

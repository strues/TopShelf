var args        = require('yargs').argv,
    gulp        = require('gulp'),
    del         = require('del'),
    glob        = require('glob'),

    chalk       = require('chalk'),
    bowerFiles  = require('main-bower-files'),
    runSequence = require('run-sequence'),
    sq          = require('streamqueue'),
    path        = require('path'),
    _           = require('lodash'),
    $           = require('gulp-load-plugins')({
                    lazy: true
                    });

var  config         = require('./gulp.config')();

var colors = $.util.colors,
    envenv = $.util.env;
process.env.NODE_ENV = $.util.env.env || 'development';


gulp.task('help', $.taskListing);



var openOpts = {
  url: 'http://localhost:' + config.defaultPort
};

var toInject = [
  'client/app/app.js',
  'client/app/appStart.js',
  'client/app/**/*.directive.js',
    '!client/app/**/*.directive.spec.js',
  'client/app/core/filters/**/*.js',
    '!client/app/core/filters/**/*.spec.js',
  'client/app/**/*.service.js',
    '!client/app/**/*.service.spec.js',
  'client/app/**/*.js',
    '!client/app/**/*.spec.js',
    '!client/bower_components/**/*',
  'client/app/**/*.controller.js',
    '!client/app/**/*.controller.spec.js',
  'client/styles/css/app.css'
];

var toDelete = [];

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
 * Lint the code and create coverage report
 * @return {Stream}
 */
gulp.task('analyze', ['plato'], function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.js)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .pipe($.jscs());
});

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
 * Compile sass
 */
gulp.task('sass', function () {
      log('Compiling Sass files to CSS');
  return gulp.src('client/styles/app.scss')
    .pipe($.plumber())
    .pipe($.sass({style: 'expanded'}))
    .pipe($.autoprefixer('last 1 version', '> 2%'))
    .pipe($.csso())
    .pipe(gulp.dest('client/styles/css'))
    .pipe($.livereload());
});

/**
 * Inject css/js files in index.html
 */
gulp.task('inject', ['sass'], function () {
      log('Injecting CSS files');

  var sources = gulp.src(toInject, { read: false });

  return gulp.src('client/index.html')
    .pipe($.inject(gulp.src(bowerFiles(), { read: false }), {
      name: 'bower',
      relative: 'true'
    }))
    .pipe($.inject(sources, { relative: true }))
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
        .pipe(gulp.dest(config.build + 'fonts'));
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', ['clean-images'], function() {
    var dest = config.build + 'images';
    log('Compressing and copying images');
    return gulp.src(config.images)
        .pipe($.imagemin({
            optimizationLevel: 6
        }))
        .pipe(gulp.dest(dest));
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
    gulp.src('client/index.html')
      .pipe($.inject(gulp.src(bowerFiles(), { read: false }), {
        name: 'bower',
        relative: 'true'
      }))
      .pipe(gulp.dest('client'));
  });

  gulp.watch(['client/index.html', 'client/app/app.js'])
    .on('change', $.livereload.changed);

  $.watch('client/styles/**/*.scss', function () {
    gulp.src('client/styles/app.scss')
      .pipe($.plumber())
      .pipe($.sass())
      .pipe(gulp.dest('client/styles/css'))
      .pipe($.livereload());
  });

  $.watch(config.js, function () {
    gulp.src('client/index.html')
      .pipe($.inject(gulp.src(toInject), { relative: true }))
      .pipe(gulp.dest('client'));
  });
});


/**
 * Tests
 */
function testServer (done) {

  log('Running server test...', { padding: true });

  gulp.src('server/**/*.spec.js', { read: false })
    .pipe($.plumber())
    .pipe($.mocha({ reporter: 'spec' }))
    .once('end', function () {
      done();
    });
}

function testClient (done) {

  log('Running client test...', { padding: true });

  gulp.src([
    'client/bower_components/angular/angular.js',
    'client/bower_components/angular-mocks/angular-mocks.js',
    'client/bower_components/angular-route/angular-route.js',
    'client/bower_components/angular-resource/angular-resource.js',
    'client/app/app.js',
    'client/views/**/*.js',
    'client/services/**/*.js',
    'client/directives/**/*.js',
    'client/filters/**/*.js'
  ])
    .pipe($.karma({
      action: 'run',
      configFile: 'client/karma.conf.js'
    }))
    .on('error', function (err) {
      console.log(err);
      this.emit('end');
    })
    .once('end', function () {
      done();
    });
}

gulp.task('test', function (done) {
  process.env.NODE_ENV = 'test';
  var filter = process.argv[3] ? process.argv[3].substr(2) : false;
  if (filter === 'client') {
    return testClient(function () { process.exit(); done(); });
  } else if (filter === 'server') {
    return testServer(function () { process.exit(); done(); });
  } else if (filter === false) {
    return testClient(function () {
      testServer(function () {
        process.exit();
        done();
      });
    });
  } else {
    console.log('Wrong parameter [%s], availables : --client, --server', filter);
  }
});

/**
 * Launch server
 */
gulp.task('serve', ['watch'], function () {
  return $.nodemon({
        script: 'server/server.js',
        ext: 'js',
        ignore: ['client', 'dist', 'node_modules']
      })
    .on('restart',  function () {
      gulp.src('client/index.html')
        .pipe($.wait(50))
        .pipe($.livereload());
    });
});

gulp.task('preview', ['build'], function () {
  process.env.NODE_ENV = 'production';
  require('./dist/server/server');
  return gulp.src('client/index.html')
    .pipe($.open('', openOpts));
});


/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean', function(done) {
    var delconfig = [].concat(config.build, config.dist, config.temp, config.report);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

/**
 * Remove all fonts from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-fonts', function(done) {
    clean([].concat(config.build + 'fonts/**/*.*'), done);
});

/**
 * Remove all images from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-images', function(done) {
    clean([].concat(config.build + 'images/**/*.*'), done);
});

/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function(done) {
    var files = [].concat(
        config.temp + '**/*.css',
        config.build + 'styles/**/*.css'
    );
    clean(files, done);
});

/**
 * Remove all js and html from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-code', function(done) {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + 'js/**/*.js',
        config.build + '**/*.html'
    );
    clean(files, done);
});

gulp.task('copy:dist', function () {
  var main = gulp.src(['server/**/*', 'package.json'], { base: './' });
  var assets = gulp.src('client/assets/**/*', { base: './' });

  return sq({ objectMode: true }, main, assets)
    .pipe(gulp.dest('dist/'));
});

gulp.task('usemin', ['inject'], function () {
  return gulp.src('client/index.html')
    .pipe($.plumber())
    .pipe($.usemin())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('cssmin', function () {
  return gulp.src('dist/client/app.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('scripts', function () {
      log('Optimizing the js');

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
      log('Optimizing the js');
  return sq({ objectMode: true }, app, tpl)
    .pipe($.concat('app.js'))
    .pipe($.ngAnnotate({add: true}))
    .pipe($.uglify())
    .pipe(getHeader())
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('replace', function () {
  return gulp.src('dist/client/index.html')
    .pipe($.replace(/<script.*livereload.*><\/script>\n*/, ''))
    .pipe(gulp.dest('dist/client'));
});

gulp.task('rev', function () {
  return gulp.src('dist/client/**')
    .pipe($.revAll({
      ignore: ['favicon.ico','.html'],
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

gulp.task('build', function (cb) {
  runSequence(
    ['clean', 'sass', 'images', 'fonts'],
    ['usemin', 'copy:dist'],
    ['replace', 'scripts', 'cssmin'],
    'rev',
    cb);
});

gulp.task('open', ['serve'], function () {
  gulp.src('client/index.html')
    .pipe($.open('', openOpts));
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
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
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


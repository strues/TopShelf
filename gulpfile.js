var gulp                    = require('gulp'),
concat                = require('gulp-concat'),
uglify                = require('gulp-uglify'),
rename                = require('gulp-rename'),
del                   = require('del'),
livereload            = require('gulp-livereload'),
inject                = require("gulp-inject"),
html2js               = require('gulp-html2js'),
jshint                = require('gulp-jshint'),
ngFilesort            = require('gulp-angular-filesort'),
stylish               = require('jshint-stylish'),
debug                 = require('gulp-debug'),
svgstore              = require('gulp-svgstore'),
merge                 = require('merge-stream'),
watch                 = require('gulp-watch'),
changed               = require('gulp-changed'),
header                = require('gulp-header'),
fs                    = require('fs'),
os                    = require('os'),
nodemon               = require('gulp-nodemon'),
conventionalChangelog = require('conventional-changelog'),
bump                  = require('gulp-bump'),
ngAnnotate            = require('gulp-ng-annotate'),
config                = require('./build.config.js'),
pkg                   = require('./package.json'),
plato                 = require('gulp-plato'),
streamqueue           = require('streamqueue'),
sass                  = require('gulp-sass'),
gutil                 = require('gulp-util'),
http                  = require('http');




var gulpArguments = process.argv.splice(2);
var ENV = process.env.NODE_ENV || 'dev';
var isDev = ENV === 'dev';
var configFilename = 'config.' + (isDev ? 'dev' : 'prod') + '.js';


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
})();

var prefixesBrowsers = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 30',
    'Firefox >= 30', // Firefox 24 is the latest ESR
    'Explorer >= 10',
    'iOS >= 6',
    'Opera >= 12',
    'Safari >= 6'
];

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    verbose: true,
    script: 'server/app.js',
    ext: 'js html scss',
    ignore: ['vendor', 'karma', 'report', 'test', 'node_modules', '.sass-cache', '.idea', '.git']
  }).on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
});


gulp.task('sass', function () {
    return gulp.src(config.app_files.scss)
        .pipe(sass({noCache: true}))
        .pipe(css)
        .on('error', function (err) { console.log(err.message); })
        .pipe(rename(function(path){
            path.basename = pkg.name + '-' + pkg.version;
        }))
        .pipe(gulp.dest(config.build_dir + '/assets'));
});

gulp.task('copy', function() {
    var sources = [
        gulp.src('client/assets/**/*', { base: 'client/assets/' })
            .pipe(changed(config.build_dir + '/assets'))
            .pipe(gulp.dest(config.build_dir + '/assets')),

        gulp.src(config.app_files.js)
            .pipe(changed(config.build_dir + '/app'))
            .pipe(ngFilesort())
            .pipe(gulp.dest(config.build_dir + '/app')),

        gulp.src(config.vendor_files.js.concat(config.vendor_files.css), {base: '.'})
            .pipe(changed(config.build_dir))
            .pipe(ngFilesort())
            .pipe(gulp.dest(config.build_dir))
    ];

    return merge(sources);
});


gulp.task('injectify', ['prod'], function () {

    var target = gulp.src('./build/index.html'),
        files = [].concat(
            config.vendor_files.css,
                'assets/' + pkg.name + '-' + pkg.version + '.app.css',
            'js/app.js',
            'app.templates.js'
        ),
        sources = gulp.src(files, {read: false, cwd: config.prod_dir});

    return target.pipe(inject(sources))
        .pipe(gulp.dest(config.prod_dir));
});


gulp.task('prod', function() {

    var paths = {
        scriptsNoTest: ['build/app/**/*.js', '!build/app/**/*.spec.js'],
        assets : 'build/assets/**/*',
        index: 'build/index.html',
        templates: 'build/templates-app.js'
    };

    //Concat into prod/js/app.js
    var concats = streamqueue(
        {objectMode: true},
        gulp.src(config.vendor_files.js),
        gulp.src(paths.scriptsNoTest)
    )
        .pipe(concat('app.js'))
        .pipe(ngFilesort())
        .pipe(ngAnnotate({
            remove: false,
            add: false,
            single_quotes: true
        }))
        .pipe(gulp.dest(config.prod_dir + '/js'));

    //Copy assets
    var simpleCopy = (function(){
        var sources = [
            gulp.src(paths.assets)
                .pipe(gulp.dest(config.prod_dir + '/assets')),
            gulp.src(paths.templates)
                .pipe(gulp.dest(config.prod_dir))
        ];
        return merge(sources);
    })();

    return {
        concats : concats,
        simpleCopy: simpleCopy
    };
});


gulp.task('jshint', function() {
    var options = {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globalstrict: true
    };

    return gulp.src(config.app_files.js)
        .pipe(jshint(options))
        .pipe(plato('report'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('html2js', function() {
    var templates = [
        { files: config.app_files.atpl, type: 'app'},
        { files: config.app_files.ctpl, type: 'common'}
    ];

    return templates.map(function(template) {
        return gulp.src(template.files)
            .pipe(html2js({base: 'client/' + template.type, outputModuleName: 'templates-' + template.type}))
            .pipe(changed(config.build_dir, {extension: '.js'}))
            .pipe(concat('templates-'+ template.type +'.js'))
            .pipe(gulp.dest(config.build_dir));
    });
});

var indexTask = function() {
    var target = gulp.src('client/index.html'),

        files = [].concat(
            config.vendor_files.js,
            '**/*.js',
            config.vendor_files.css,
            'templates-common.js',
            'templates-app.js',
                'assets/' + pkg.name + '-' + pkg.version + '.css'
        ),

        sources = gulp.src(files, {read: false, cwd: config.build_dir, addRootSlash: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest(config.build_dir));
};

gulp.task('index', ['sass', 'copy', 'html2js'], function() {
    return indexTask();
});

gulp.task('watch-index', ['sass'], function() {
    return indexTask();
});

var svgstoreTask = function() {
    var svgs = gulp.src('client/assets/svg/*.svg')
            .pipe(svgstore({ prefix: pkg.name + '-', inlineSvg: true })),

        fileContents = function fileContents (filePath, file) {
            return file.contents.toString('utf8');
        };

    return gulp.src(config.build_dir + '/index.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest(config.build_dir));
};

gulp.task('svgstore', ['index'], function () {
    return svgstoreTask();
});

gulp.task('watch-svgstore', ['watch-index'], function () {
    return svgstoreTask();
});

gulp.task('livereload', ['svgstore'], function() {
    livereload.listen();
    gulp.watch(config.build_dir + '/**').on('change', livereload.changed);
});

gulp.task('watch', ['svgstore'], function() {
    gulp.watch(['**/*.scss'], ['sass']);
    gulp.watch(['app/**/*.js'], [
        //'jshint',
        'copy'
    ]);
    gulp.watch([config.app_files.atpl, config.app_files.ctpl], ['html2js']);
    gulp.watch('client/index.html', ['watch-index', 'watch-svgstore']);
    gulp.watch('client/assets/svg/*.svg', ['svgstore']);
});

gulp.task('server', ['nodemon'], function() {

    gutil.log(gutil.colors.blue('HTTP server listening on port 9000'));
});

gulp.task('open-browser', ['server'], function () {
    'use strict';

    if (gulpArguments.indexOf('--not-open') === -1) {
        gulp.src(build_dir + '/index.html')
            .pipe($.open('', {
                url: 'http://' + (isPublicServer ? 'localhost' : server.host) + ':' + server.port,
                app: browserApp
            }));
    }
});

gulp.task('default', [
    //'jshint',
    'server',
    'watch',
    'livereload'
]);

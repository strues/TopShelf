/* jshint node: true */
'use strict';

var gulp = require('gulp');

/**********************
 * GULP PLUGINS 
 ************************************************************/
var _ = require('lodash'),
    args       = require('yargs').argv,
    browserSync = require('browser-sync'),
    help        = require('gulp-help'),
    karma       = require('karma').server,
    nodemon     = require('gulp-nodemon'),
    rimraf      = require('rimraf'),
    streamqueue = require('streamqueue');

var jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    plato   = require('gulp-plato'),
    addSrc  = require('gulp-add-src');

var ngAnnotate = require('gulp-ng-annotate'),
    ngFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');


/**********************
 * GULP CONFIGURATION 
 ************************************************************/

var appBase = 'client/',
    appScripts     = appBase + 'app/**/*.js',
    appStyles      = appBase + 'styles/**/*.scss',
    appHTML        = appBase + '*.html',
    appTemplates   = appBase + 'app/**/*.tpl.html',
    appAssets      = appBase + 'assets/',
    appImages      = appAssets + 'images/**/*',
    appFonts       = appAssets + 'fonts/**/*',
    // Build
    build          = 'build/',
    buildStyles    = build + 'styles/',
    buildScripts   = build + 'scripts/',
    buildTemplates = build + 'templates/',
    buildAssets    = build +'assets/',
    buildImages    = buildAssets + 'images/',
    buildFonts     = buildAssets + 'fonts/',
    
    // Tests
    e2eTest        = 'test/e2e/**/*_test.js',
    unitTest       = 'test/unit/**/*_test.js',
    karmaConf      = 'test/karma.conf.js',

    isProd         = args.stage === 'prod',

    bowerDir = appBase + 'bower_components/';


gulp.task('clean', function (cb) {
  return rimraf(build, cb);
});

gulp.task('watch', function () {
  browserSync.reload();
  gulp.watch([appScripts, appStyles, appHTML, appTemplates, appImages, appFonts],
    ['build', browserSync.reload]);
});

var nodemon = require('gulp-nodemon');
var httpProxy = require('http-proxy');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('serve', ['nodemon', 'reload-browser'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:9000',
    port: 5000,
    notify: true,
    https: true
   
  });
  gulp.watch([appScripts, appStyles, appHTML, appTemplates, appImages, appFonts],
    ['build', browserSync.reload])});



  gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    verbose: true,
    script: 'server/app.js',
    ext: 'js html scss',
    ignore: ['bower_components', 'node_modules', '.sass-cache', '.idea', '.git']
  }).on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  }).on('change', function () {
    gulp.run('reload-browser');
  });
});

gulp.task('reload-browser', ['server_restart'], function () {
  setTimeout(function () {
    reload({ stream: false });
  }, 1000);
});
gulp.task('server_restart', function () {

});
/*
 * JAVASCRIPT
 * BUILD:SCRIPTS // DIST:SCRIPTS
 * JSHINT
 */

gulp.task('build:scripts', ['clean', 'jshint'], function () {
  return gulp.src(appScripts)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(buildScripts));
});

gulp.task('dist:scripts', ['clean'], function () {
  return gulp.src(appScripts)
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(buildScripts));
});

gulp.task('jshint', function () {
  return gulp.src([appScripts, e2eTest, unitTest])
    .pipe(addSrc([karmaConf,'Gulpfile.js']))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(plato('report'));
});


/*
 * TEMPLATES
 * BUILD:TEMPLATES // DIST:TEMPLATES
 * JSHINT
 */
var ngHtml2Js = require("gulp-ng-html2js"),
    htmlmin       = require("gulp-htmlmin"),
    concat        = require("gulp-concat");
    uglify        = require("gulp-uglify");

gulp.task('build:templates', function () {
return gulp.src(appTemplates)
    .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
    }))
    .pipe(ngHtml2Js({
        moduleName: 'app.templates',
        prefix: '/templates'
    }))
    .pipe(concat('templates.min.js'))
    .pipe(gulp.dest(buildTemplates));
});

gulp.task('dist:templates', function () {
return gulp.src(appTemplates)
    .pipe(minifyHtml({
        empty: true,
        spare: true,
        quotes: true
    }))
    .pipe(ngHtml2Js({
        moduleName: 'app.templates',
        prefix: '/templates'
    }))
    .pipe(concat('templates.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildTemplates));
});

/*
 * HTML
 * BUILD:HTML // DIST:HTML
 * 
 */
gulp.task('build:html', ['clean'], function () {
  return gulp.src(appHTML)
    .pipe(wiredep())
    .pipe(gulp.dest(build));
});


/*
 * STYLESHEETS
 * BUILD:STYLES // DIST:STYLES
 * 
 */

var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    uncss = require('gulp-uncss'),
    rename = require('gulp-rename'),
    errorhandler = require('errorhandler'),
    cssmin = require('gulp-cssmin');


gulp.task('build:styles', ['clean'], function () {
  return gulp.src(appStyles)
        .pipe(sass())
        .pipe(plumber())
        .pipe(rename('style.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest(buildStyles));
});

gulp.task('dist:styles', ['clean'], function () {
  return gulp.src(appStyles)
        .pipe(sass())
        .pipe(plumber())
        .pipe(rename('style.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(uncss({html:'appHTML'}))
        .pipe(cssmin())
        .pipe(gulp.dest(buildStyles));
});


gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src(appBase + 'styles/*.scss')
      .pipe(wiredep({ directory: 'client/bower_components' }))  
      .pipe(gulp.dest(appStyles));

  gulp.src(appHTML)
      .pipe(wiredep({ directory: 'client/bower_components',
        exclude: ['bootstrap-sass-official']
      }))
      .pipe(gulp.dest(appBase));
});

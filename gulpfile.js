var gulp = require('gulp'),
  gulpif = require('gulp-if'),
  concat = require('gulp-concat'),
  rimraf = require('gulp-rimraf'),
  templateCache = require('gulp-angular-templatecache'),
  minifyHtml = require('gulp-minify-html'),
  es = require('event-stream'),
  sass = require('gulp-sass'),
  jshint = require('gulp-jshint'),
  rename = require('gulp-rename'),
  ngAnnotate = require('gulp-ng-annotate'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  webserver = require('gulp-webserver'),
  livereload = require('gulp-livereload'),
  watch = require('gulp-watch'),
  nodemon = require('gulp-nodemon'),
  testem = require('gulp-testem'),
  argv = require('yargs').argv;

var _paths = ['src/server/**/*.js', 'src/client/**/*'];
var paths = {
  appJavascript: ['src/client/app/app.js','src/client/components/**/*.js', 'src/client/app/**/*.js'],
  appTemplates: 'src/client/**/*.tpl.html',
  appMainSass: 'src/client/content/scss/main.scss',
  appStyles: 'src/client/content/scss/**/*.scss',
  appImages: 'src/client/content/images/**/*',
  indexHtml: 'src/client/index.html',
  vendorJavascript: [
    'vendor/jquery/dist/jquery.js',
    'vendor/lodash/dist/lodash.js',
    'vendor/angular/angular.js',
    'vendor/ngstorage/ngStorage.js',
    'vendor/angular-animate/angular-animate.js',
    'vendor/angular-resource/angular-resource.js',
    'vendor/angular-messages/angular-messages.js',
    'vendor/angular-sanitize/angular-sanitize.js',
    'vendor/angular-httpi/build/httpi.min.js',
    'vendor/ng-battlenet/src/ng-battlenet.js',
    'vendor/angular-ui-router/release/angular-ui-router.js',
    'vendor/angular-bootstrap/ui-bootstrap.js',
    'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
    'vendor/angular-form-for/dist/form-for.js',
    'vendor/angular-form-for/dist/form-for.bootstrap-templates.js'
  ],
  vendorCss: [
    'vendor/font-awesome/css/font-awesome.css',
    'vendor/icomoon/style.css',
    'vendor/angular-loading-bar/src/loading-bar.cs'

  ],
  specFolder: ['spec/**/*_spec.js'],
  tmpFolder: 'tmp',
  tmpJavascript: 'tmp/js',
  tmpCss: 'tmp/css',
  tmpImages: 'tmp/images',
  distFolder: 'dist',
  distJavascript: 'dist/js',
  distCss: 'dist/css',
  distImages: 'dist/images'
};

//register nodemon task
gulp.task('nodemon', function() {
  nodemon({
      script: 'src/server/app.js',
      env: {
        'NODE_ENV': 'development'
      }
    })
    .on('restart');
});


gulp.task('scripts', function() {
  return gulp.src(paths.vendorJavascript.concat(paths.appJavascript, paths.appTemplates))
    .pipe(gulpif(/html$/, buildTemplates()))
    .pipe(concat('app.js'))
    .pipe(gulpif(argv.production, ngAnnotate()))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulpif(argv.production, gulp.dest(paths.distJavascript), gulp.dest(paths.tmpJavascript)));
});

gulp.task('styles', function() {
  return gulp.src(paths.vendorCss.concat(paths.appMainSass))
    .pipe(gulpif(/scss$/, sass()))
    .pipe(concat('app.css'))
    .pipe(gulpif(argv.production, minifyCSS()))
    .pipe(gulpif(argv.production, gulp.dest(paths.distCss), gulp.dest(paths.tmpCss)));
});

gulp.task('images', function() {
  return gulp.src(paths.appImages)
    .pipe(gulpif(argv.production, gulp.dest(paths.distImages), gulp.dest(paths.tmpImages)));
});

gulp.task('indexHtml', function() {
  return gulp.src(paths.indexHtml)
    .pipe(gulpif(argv.production, gulp.dest(paths.distFolder), gulp.dest(paths.tmpFolder)));
});

gulp.task('lint', function() {
  return gulp.src(paths.appJavascript.concat(paths.specFolder))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('testem', function() {
  return gulp.src(['']) // We don't need files, that is managed on testem.json
    .pipe(testem({
      configFile: 'testem.json'
    }));
});

gulp.task('clean', function() {
  return gulp.src([paths.tmpFolder, paths.distFolder], {
      read: false
    })
    .pipe(rimraf());
});

gulp.task('watch', ['nodemon'], function() {
  livereload.listen();
  gulp.watch(paths.appJavascript, ['lint', 'scripts']);
  gulp.watch(paths.appTemplates, ['scripts']);
  gulp.watch(paths.vendorJavascript, ['scripts']);
  gulp.watch(paths.appImages, ['images']);
  gulp.watch(paths.specFolder, ['lint']);
  gulp.watch(paths.indexHtml, ['indexHtml']);
  gulp.watch(paths.appStyles, ['styles']);

  gulp.watch(_paths).on('change', livereload.changed);
});

gulp.task('webserver', ['scripts', 'styles', 'images', 'indexHtml'], function() {
  gulp.src(paths.tmpFolder)
    .pipe(webserver({
      port: 5000,
      proxies: [{
        source: '/api',
        target: 'http://localhost:3000/api'
      }]
    }));
});

gulp.task('default', ['watch']);

function buildTemplates() {
  return es.pipeline(
    minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }),
    templateCache({
      module: 'app'
    })
  );
}

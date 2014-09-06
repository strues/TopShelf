'use strict';

var gulp = require('gulp')
  , $ = require('gulp-load-plugins')({
    pattern: [
      'gulp-*',
      'main-bower-files',
      'rimraf',
      'uglify-save-license',
      'wiredep',
      'yargs'
    ]
  })

  , appBase = 'app/'
  , appFontFiles = appBase + 'fonts/**/*'
  , appImages = appBase + 'images/**/*'
  , appMarkupFiles = appBase + '**/*.html'
  , appScriptFiles = appBase + '**/*.js'
  , appStyleFiles = appBase + '**/*.{css,scss}'

  , build = 'build/'
  , buildCss = build + 'css/'
  , buildFonts = build + 'fonts/'
  , buildImages = build + 'images/'
  , buildJs = build + 'js/'

  , isProd = $.yargs.argv.stage === 'prod';

// delete build directory
gulp.task('clean', function (cb) {
  return $.rimraf(build, cb);
});

// compile markup files and copy into build directory
gulp.task('markup', ['clean'], function () {

  return gulp.src([
    appMarkupFiles
  ])
    .pipe(gulp.dest(build));
});

// compile styles and copy into build directory
gulp.task('styles', ['clean'], function () {
  var scssFilter = $.filter('**/*.scss');

  return gulp.src([
    appStyleFiles
  ])
    .pipe(scssFilter)
    .pipe($.sass())
    .pipe(scssFilter.restore())
    .pipe($.autoprefixer())
    .pipe($.if(isProd, $.concat('app.css')))
    .pipe($.if(isProd, $.cssmin()))
    .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest(buildCss));
});

// compile scripts and copy into build directory
gulp.task('scripts', ['clean', 'markup'], function () {
  var htmlFilter = $.filter('**/*.html'),
    jsFilter = $.filter('**/*.js');

  return gulp.src([
    appScriptFiles,
    build + '**/*.html',
    '!**/*_test.*'
  ])
    .pipe($.if(isProd, htmlFilter))
    .pipe($.if(isProd, $.ngHtml2js({
      moduleName: require('../package.json').name,
      declareModule: false
    })))
    .pipe($.if(isProd, htmlFilter.restore()))
    .pipe(jsFilter)
    .pipe($.if(isProd, $.angularFilesort()))
    .pipe($.if(isProd, $.concat('app.js')))
    .pipe($.if(isProd, $.ngAnnotate()))
    .pipe($.if(isProd, $.uglify()))
    .pipe($.if(isProd, $.rev()))
    .pipe(jsFilter.restore())
    .pipe(gulp.dest(buildJs));
});

// inject custom CSS and JavaScript into index.html
gulp.task('inject', ['markup', 'styles', 'scripts'], function () {
  var jsFilter = $.filter('**/*.js');

  return gulp.src(build + 'index.html')
    .pipe($.inject(gulp.src([
      buildCss + '**/*',
      buildJs + '**/*'
    ])
    .pipe(jsFilter)
    .pipe($.angularFilesort())
    .pipe(jsFilter.restore()), {
      addRootSlash: false,
      ignorePath: build
    }))
    .pipe(gulp.dest(build));
});

// copy bower components into build directory
gulp.task('bowerCopy', ['inject'], function () {
  var cssFilter = $.filter('**/*.css')
    , jsFilter = $.filter('**/*.js');

  return gulp.src($.wiredep({exclude: [/polymer/, /platform/]}).css.concat($.wiredep({exclude: [/polymer/, /platform/]}).js))
    .pipe(cssFilter)
    .pipe($.if(isProd, $.concat('vendor.css')))
    .pipe($.if(isProd, $.cssmin()))
    .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest(buildCss))
    .pipe(cssFilter.restore())
    .pipe(jsFilter)
    .pipe($.if(isProd, $.concat('vendor.js')))
    .pipe($.if(isProd, $.uglify({
      preserveComments: $.uglifySaveLicense
    })))
    .pipe($.if(isProd, $.rev()))
    .pipe(gulp.dest(buildJs))
    .pipe(jsFilter.restore());
});

// inject bower components into index.html
gulp.task('bowerInject', ['bowerCopy'], function () {
  if (isProd) {
    return gulp.src(build + 'index.html')
      .pipe($.inject(gulp.src([
        buildCss + 'vendor*.css',
        buildJs + 'vendor*.js'
      ], {
        read: false
      }), {
        starttag: '<!-- bower:{{ext}} -->',
        endtag: '<!-- endbower -->',
        addRootSlash: false,
        ignorePath: build
      }))
      .pipe($.htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(gulp.dest(build));
  } else {
    return gulp.src(build + 'index.html')
      .pipe($.wiredep.stream({
        fileTypes: {
          html: {
            replace: {
              css: function (filePath) {
                return '<link rel="stylesheet" href="' + 'css/' + filePath.split('/').pop() + '">';
              },
              js: function (filePath) {
                return '<script src="' + 'js/' + filePath.split('/').pop() + '"></script>';
              }
            }
          }
        }
      }))
      .pipe(gulp.dest('build/'));
  }
});

// copy fonts from Bower and custom fonts into build directory
gulp.task('fonts', ['clean'], function () {
  var fontFilter = $.filter('**/*.{eot,otf,svg,ttf,woff}');
  return gulp.src(
      $.mainBowerFiles().concat([appFontFiles]))
    .pipe(fontFilter)
    .pipe(gulp.dest(buildFonts))
    .pipe(fontFilter.restore());
});

// copy and optimize images into build directory
gulp.task('images', ['clean'], function () {
  return gulp.src(appImages)
    .pipe($.imagemin())
    .pipe(gulp.dest(buildImages));
});

gulp.task('build', ['bowerInject', 'images', 'fonts']);

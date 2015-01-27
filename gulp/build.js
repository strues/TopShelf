'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var autoprefixer = require('autoprefixer-core');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'glob', 'del']
});

gulp.task('styles', ['wiredep', 'inject-sass'], function () {
    gutil.log('Compiling Sass --> CSS');
    return gulp
      .src(['client/styles/styles.scss', '!client/styles/vendor.scss'])
      .pipe($.plumber()) // exit gracefully if something fails after this
      .pipe($.sourcemaps.init())
      .pipe($.sass({style: 'expanded'}))
      .on('error', function handleError(err) {
          console.error(err.toString());
          this.emit('end');
      })
      .pipe($.postcss([autoprefixer({browsers: ['last 2 version']})]))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('.tmp/styles/'))
      .pipe($.notify('Sass changed and reloaded'));
});

gulp.task('inject-sass', function () {
    return gulp
    .src('client/styles/index.scss')
    .pipe($.inject(gulp.src([
        'client/{styles,app}/**/*.scss',
        '!client/styles/styles.scss',
        '!client/styles/vendor.scss'
      ], {read: false}), {
      transform: function(filePath) {
          filePath = filePath.replace('client/styles/', '');
          filePath = filePath.replace('client/app/', '../app/');
          return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    }))
    .pipe(gulp.dest('client/styles/'))
    .pipe($.notify());
});

gulp.task('injector:css', ['styles'], function () {
    return gulp.src('client/index.html')
    .pipe($.inject(gulp.src([
        '.tmp/styles/**/*.css',
        '!.tmp/styles/vendor.css'
      ], {read: false}), {
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(gulp.dest('client/'))
    .pipe($.notify());
});

gulp.task('lint', function () {
    return gulp.src(['client/app/**/*.js', '!client/app/**/*.spec.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('injector:js', ['lint', 'injector:css'], function () {
    return gulp
    .src(['client/index.html', '.tmp/index.html'])
    .pipe($.inject(gulp.src([
      'client/app/**/*.js',
      '!client/app/**/*.spec.js',
      '!client/app/**/*.mock.js'
    ]).pipe($.angularFilesort()), {
      ignorePath: 'client',
      addRootSlash: false
    }))
    .pipe(gulp.dest('client/'))
    .pipe($.notify());
});

gulp.task('templates', function () {

    return gulp
    .src('client/app/**/*.tpl.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templates.js', {
      module: 'topshelf.core',
      standalone: false,
      root: 'app/'
    }))
    .pipe(gulp.dest('.tmp/'))
    .pipe($.notify());
});

gulp.task('html', ['wiredep', 'injector:css', 'injector:js', 'templates'], function () {
    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    var templateCacheFile = gulp.src('./.tmp/templates.js', {read: false});
    var templateCacheOpt = {
      starttag: '<!-- inject:partials -->',
      ignorePath: '.tmp',
      addRootSlash: false
    };

    return gulp.src('client/index.html')
    .pipe($.plumber())
    .pipe($.inject(templateCacheFile, templateCacheOpt))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate({add: true}))
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe($.sourcemaps.write())
    .pipe(cssFilter)
    .pipe($.replace(['../bootstrap-sass/assets/fonts/bootstrap'], 'assets/fonts'))
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist/client/'))
    .pipe($.size({title: 'dist/client/', showFiles: true}))
    .pipe($.notify());
});

gulp.task('images', function () {
    return gulp.src('client/assets/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 4,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/client/assets/images/'));
});

gulp.task('fonts', function () {
    return gulp.src('./bower_components/font-awesome/fonts/**.*') 
      .pipe(gulp.dest('dist/client/assets/fonts/'));
});

gulp.task('misc', function () {
    return gulp.src('client/**/*.ico')
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('clean', function (done) {
    $.del(['dist/', '.tmp/'], done);
});

gulp.task('build', ['templates', 'html', 'images', 'fonts', 'misc']);

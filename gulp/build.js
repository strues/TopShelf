'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('styles', ['wiredep', 'injector:css:preprocessor'], function () {
  return gulp.src(['client/styles/styles.scss', 'client/styles/vendor.scss'])
    .pipe($.sass({style: 'expanded'}))
    .on('error', function handleError(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe($.autoprefixer())
    .pipe(gulp.dest('.tmp/styles/'));
});

gulp.task('injector:css:preprocessor', function () {
  return gulp.src('client/styles/index.scss')
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
    .pipe(gulp.dest('client/styles/'));
});

gulp.task('injector:css', ['styles'], function () {
  return gulp.src('client/index.html')
    .pipe($.inject(gulp.src([
        '.tmp/{styles, app}/**/*.css',
        '!.tmp/styles/vendor.css'
      ], {read: false}), {
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(gulp.dest('client/'));
});

gulp.task('scripts', function () {
    return gulp.src(['client/app/**/*.js', '!client/app/**/*.spec.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('injector:js', ['scripts', 'injector:css'], function () {
    return gulp.src(['client/index.html', '.tmp/index.html'])
    .pipe($.inject(gulp.src([
      'client/app/**/*.js',
      '!client/app/**/*.spec.js',
      '!client/app/**/*.mock.js'
    ]).pipe($.angularFilesort()), {
      ignorePath: 'client',
      addRootSlash: false
    }))
    .pipe(gulp.dest('client/'));
});

gulp.task('partials', function () {
    return gulp.src(['client/app/**/*.tpl.html', '.tmp/app/**/*.tpl.html'])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templates.js', {
      module: 'topshelf.core',
      standalone: false
    }))
    .pipe(gulp.dest('.tmp/inject/'));
});

gulp.task('html', ['wiredep', 'injector:css', 'injector:js', 'partials'], function () {
    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src(['client/*.html', 'client/**/*.tpl.html', '.tmp/*.html'])
    .pipe($.inject(gulp.src('.tmp/inject/templates.js', {read: false}), {
      starttag: '<!-- inject:partials -->',
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.replace('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', 'fonts'))
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
    .pipe($.size({title: 'dist/client/', showFiles: true}));
});

gulp.task('images', function () {
    return gulp.src('client/assets/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/client/assets/images/'));
});

gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/client/assets/fonts/'));
});

gulp.task('misc', function () {
    return gulp.src('client/**/*.ico')
    .pipe(gulp.dest('dist/client/'));
});

gulp.task('clean', function (done) {
    $.del(['dist/', '.tmp/'], done);
});

gulp.task('build', ['html', 'images', 'fonts', 'misc']);

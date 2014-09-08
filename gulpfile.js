/* jshint node: true */

/**
 *
 *  Angular Starter Kit
 *
 *  Licensed under the the Creative Common License (CC0)
 *  Copyright (c) <2014> <Jan Nahody>
 *
 */

'use strict';


/* Include Gulp, Plugins and Tools *************************/
var gulp            = require('gulp'),
    angularInject   = require('gulp-angular-inject-module'),
    autoprefixer    = require('gulp-autoprefixer'),
    bower           = require('main-bower-files'),
    clip            = require('gulp-clip-empty-files'),
    concat          = require('gulp-concat'),
    connect         = require('gulp-connect'),
    consolidate     = require('gulp-consolidate'),
    cssmin          = require('gulp-minify-css'),
    filter          = require('gulp-filter'),
    flatten         = require('gulp-flatten'),
    fs              = require('fs'),
    gulpif          = require('gulp-if'),
    gutil           = require('gulp-util'),
    gzip            = require('gulp-gzip'),
    htmlmin         = require('gulp-htmlmin'),
    icontypo        = require('gulp-iconfont'),
    ignore          = require('gulp-ignore'),
    imagemin        = require('gulp-imagemin'),
    inject          = require('gulp-inject'),
    jshint          = require('gulp-jshint'),
    lodash          = require('lodash'),
    open            = require('gulp-open'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    replace         = require('gulp-replace'),
    rev             = require('gulp-rev'),
    rimraf          = require('gulp-rimraf'),
    runSequence     = require('run-sequence'),
    sass            = require('gulp-sass'),
    size            = require('gulp-size'),
    stream          = require('event-stream'),
    streamqueue     = require('streamqueue'),
    tar             = require('gulp-tar'),
    templateCache   = require('gulp-angular-templatecache'),
    uglify          = require('gulp-uglify');
    var modRewrite = require('connect-modrewrite');
/* Configuration *******************************************/
var config = {
    name:               'TopShelf',
    version:            '0.4.0',
    build:              'dev',
    title:              'Top Shelf - Sargeras Mythic Raiding',
    description:        'Top Shelf guild.',

    mainScript:         'app.js',
    templatesModule:    'app',
    imageTypes:         '**/*.{jpg,png,gif,svg}',
    typoTypes:          '**/*.{ttf,eot,woff,svg}',
    typoName:           'webicons',
    typoClassName:      'webicon',
    paths: {
        staticFiles:        ['client/*.{jpg,png,ico,gif,txt,webapp}','client/data/**','client/i18n/**','client/assets/typo/**'],
        headScripts:        ['client/bower_components/modernizr/modernizr.js'],
        images:             ['client/assets/images/**/*'],
        sass:               ['client/styles/**/*.scss'],
        css:                ['client/styles/**/*.css'],
        templates:          ['client/app/**/*.tpl.html'],
        scripts:            ['client/app/**/*.js'],
        typo:               'client/assets/typo',
        icons:              'client/assets/icons',
        serve:              '.tmp',
        build:              'dist',
        libraries: {
            paths: {
                bowerDirectory: 'client/bower_components',
                bowerrc:        '.bowerrc',
                bowerJson:      'bower.json'
            }
        }
    },
    serve: {
        host:               '0.0.0.0',
        port:               8000,
        middleware: function() { // this is a rewrite to proxy to the express server
          return [ // express must be started first
            modRewrite([
              '^/api/(.*)$ http://localhost:9000/api/$1 [P]'
            ])
          ];
        },
        livereload: {
            port:           35729
        },
        openUrl:            'http://localhost',
        root:               ['./.tmp','./client']
    },
    reload: {
        onTemplateChanged:  true,
        onStaticChanged:    false,
        onImageChanged:     false,
        onIconsChanged:     false,
        onTypoChanged:      false
    },
    use: {
        jshint:             true,
        imagemin:           true,
        openbrowser:        true
    },
    plugins: {
        imagemin: {
            progressive:    true,
            interlaced:     true
        },
        htmlmin: {
            collapseWhitespace: true,
            removeComments:     true
        },
        sass: {

        },
        gzip: {

        },
        bower: {

        },
        uglify: {
            mangle: false
        }
    }
};




/* Helpers *************************************************/
// hot fix for buggy gulp.src handling empty array
function emptyArray(value) {
    if ( (value instanceof Array) && (value.length > 0) ) {
        return value;
    }
    return '';
}

// Get timestamp
function getTimestamp() {
    var _date = new Date();

    function padStr(i) {
        return (i < 10) ? "0" + i : "" + i;
    }

    return  padStr(_date.getFullYear()) +
        padStr(1 + _date.getMonth()) +
        padStr(_date.getDate()) +
        padStr(_date.getHours()) +
        padStr(_date.getMinutes()) +
        padStr(_date.getSeconds());
}

// User settings for Gulpfile
function getSettings(options) {
    var _options, settings, manifest, packageinfo;

    // options settings
    _options = {manifest: true};

    if (typeof options === 'object') {
        _options = lodash.merge(_options, options);
    }

    // load files
    settings     = false;
    manifest     = false;
    packageinfo  = false;

    // load user settings
    try {
        settings = JSON.parse(fs.readFileSync(__dirname + '/gulptask.json'));

    } catch (err) {
        gutil.log(gutil.colors.red('Missing gulptask.json file.'), gutil.colors.blue(' Run \'gulp init\' to generate.'));
        process.exit(1);
    }

    // load package settings
    try {
        packageinfo = JSON.parse(fs.readFileSync(__dirname + '/package.json'));
        packageinfo.extract = {};
        if (typeof packageinfo.name !== 'undefined') {
            packageinfo.extract.name = packageinfo.name;
        }
        if (typeof packageinfo.version !== 'undefined') {
            packageinfo.extract.version = packageinfo.version;
        }
        if (typeof packageinfo.title !== 'undefined') {
            packageinfo.extract.title = packageinfo.title;
        }
        if (typeof packageinfo.description !== 'undefined') {
            packageinfo.extract.description = packageinfo.description;
        }
    } catch (err) {
        gutil.log(gutil.colors.red('Missing or mismatched package.json file.'));
        process.exit(1);
    }

    // load manifest.webapp
    try {
        manifest = JSON.parse(fs.readFileSync( __dirname + '/client/manifest.webapp'));
    } catch (err) {
        gutil.log(gutil.colors.red('Missing or mismatched client/manifest.webapp file.'));
        process.exit(1);
    }

    // load user settings
    if (settings) {
        config = lodash.merge(config, settings, packageinfo.extract);
    }

    // set build
    config.build = getTimestamp();

    // update to manifest.webapp
    if (manifest && _options.manifest) {
        if (typeof config.version != 'undefined') {
            manifest.version = config.version;
        }

        if (typeof config.description != 'undefined') {
            manifest.description = config.description;
        }

        if (typeof config.name != 'undefined') {
            manifest.name = config.name;
        }

        // write out
        fs.writeFile( __dirname + '/client/manifest.webapp', JSON.stringify(manifest, null, 4), function(err) {
            if(err) {
                gutil.log(err);
            } else {
                gutil.log("Manifest.webapp file updated.");
            }
        });
    }

}


/**
 * Error handling
 *
 * @param err
 */
var onError = function (err) {
    gutil.beep();
    gutil.log(err);
};




/**
 * Task: DEFAULT
 *
 */
gulp.task('default', ['build']);



/**
 * Task: INIT
 *
 */
gulp.task('init', function() {
    var settings;

    settings = {
        serve: {
            host:         config.serve.host,
            port:         config.serve.port,
            livereload:   config.serve.livereload,
            openUrl:      config.serve.openUrl
        },
        reload:             config.reload,
        use:                config.use
    };

    fs.writeFile( __dirname + '/gulptask.json', JSON.stringify(settings, null, 4), function(err) {
        if(err) {
            gutil.log(err);
        } else {
            gutil.log("gulptask.json file created.");
        }
    });
});













/**
 * Task: SERVE
 *
 */
gulp.task('serve-clean', function() {
    getSettings();
    gulp.src('.tmp').pipe(rimraf());
});

gulp.task('serve-style', ['serve-clean'], function() {
    var styles = {};

    // sass files
    styles.sass_files = gulp.src(config.paths.sass)
        .pipe(clip())
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass(config.plugins.sass));

    // css files
    styles.css_files = gulp.src(config.paths.css);

    // stream
    return streamqueue({ objectMode: true }, styles.sass_files, styles.css_files)
        .pipe(autoprefixer('last 1 versions'))
        .pipe(gulp.dest('.tmp/styles'));
});

// ** TYPO **
// clean-icons
gulp.task('serve-clean-icons', ['serve-clean'], function() {
    var clean = {};

    // scss file
    clean.scss = gulp.src('client/styles/' + config.typoName + '.scss');

    // typo files
    clean.typo_files = gulp.src(config.paths.typo + '/' + config.typoName + '.*');

    // stream
    return stream.merge( clean.scss, clean.typo_files)
        .pipe(rimraf());
});

// icons generate
gulp.task('serve-icons', ['serve-clean','serve-clean-icons'], function(){
    return gulp.src(config.paths.icons + '/*.svg')
        .pipe(icontypo({
            fontName: config.typoName,
            appendCodepoints: false
        }))
        .on('codepoints', function(codepoints) {
            gulp.src('client/assets/icons/icons.scss.template')
                .pipe(consolidate('lodash', {
                    glyphs: codepoints,
                    fontName: config.typoName,
                    fontPath: '../typo/',             // set path to typo (from your CSS file if relative)
                    className: config.typoClassName    // set class name in your CSS
                }))
                .pipe(rename(config.typoName + '.css'))
                .pipe(gulp.dest('.tmp/styles/'));
        })
        .pipe(gulp.dest(config.paths.typo));
});


// ** LINT **
// Lint JavaScript
gulp.task('serve-jshint', ['serve-clean'], function () {
    if (config.use.jshint) {
        gutil.log(gutil.colors.green('JS Hint active.'));
    } else {
        gutil.log(gutil.colors.red('JS Hint deactivated.'));
    }

    return gulp.src(config.paths.scripts)
        .pipe( gulpif(config.use.jshint, jshint(), gutil.noop()) )
        .pipe( gulpif(config.use.jshint, jshint.reporter('jshint-stylish'), gutil.noop()) );
       
});





// ** INJECT **
// inject - serve (index.html)
gulp.task('serve-inject', ['serve-style', 'serve-icons', 'serve-jshint'], function() {
    var html_inject = {};

    var inject_err = new gutil.PluginError('test', {
        message: 'something broke'
    });


    // html file inject script into head
    html_inject.head_scripts = inject(
        gulp.src(config.paths.headScripts,{read: false}),
        {starttag: '<!-- inject:head:{{ext}} -->', ignorePath: ['client'], addRootSlash: false});

    // html file inject library scripts
    html_inject.library_script = inject(
        gulp.src(emptyArray(bower(config.paths.libraries))),
        {starttag: '<!-- inject:libraries:{{ext}} -->', ignorePath: ['client'], addRootSlash: false});

    // html file inject bower css, css and script files
    html_inject.body_script_css = inject(
        streamqueue( { objectMode: true },
            gulp.src(emptyArray(bower(config.plugins.bower))).pipe(ignore.exclude('!**/*.css')),
            gulp.src(['client/app/**/*.js', '.tmp/styles/**/*.css'], {read: false}) ),
        {ignorePath: ['/.tmp', 'client'], addRootSlash: false});

    // html file inject bower script files
    html_inject.bower_script = inject(
        gulp.src(emptyArray(bower(config.plugins.bower))),
        {starttag: '<!-- inject:bower:{{ext}} -->', ignorePath: ['client'], addRootSlash: false});

    // html file inject
    return gulp.src('client/index.html')
        .pipe(html_inject.head_scripts)
        .pipe(html_inject.library_script)
        .pipe(html_inject.body_script_css)
        .pipe(html_inject.bower_script)
        .pipe(replace('<%appversion%>',     config.version))
        .pipe(replace('<%apptitle%>',       config.title))
        .pipe(replace('<%appdescription%>', config.description))
        .pipe(replace('<%appbuild%>',       'dev'))
        .pipe(gulp.dest('.tmp'));
});

// ** SERVE **
// serve
gulp.task('serve', ['serve-inject'], function() {
    // Start server
    connect.server(config.serve);

    // Open browser
    gulp.src(config.paths.serve + '/index.html')
        .pipe(gulpif(config.use.openbrowser, open('', {url: config.serve.openUrl + ':' + config.serve.port + '/'})) );

    /*** INTERNAL TASKS ***/
    // Refresh
    gulp.task('dev-serve-refresh', ['serve-inject'], function() {
        gulp.src('client/*.html').pipe(connect.reload());
    });

    /*** WATCHERS ***/
    // Serve watch
    gulp.watch(['client/index.html','bower.json','!client/styles/fonts/' + config.fontName + '.scss'].concat(config.paths.scripts, config.paths.sass, config.paths.css), ['dev-serve-refresh']);

    // Serve watch images
    gulp.watch(config.paths.images, function() {
        gulp.src('.tmp/*.html').pipe( gulpif(config.reload.onImageChanged, connect.reload()) );
    });

    // data (static files)
    gulp.watch(config.paths.statics, function() {
        gulp.src('.tmp/*.html').pipe( gulpif(config.reload.onStaticChanged, connect.reload()) );
    });

    // Serve watch templates
    gulp.watch(config.paths.templates, function() {
        gulp.src('.tmp/*.html').pipe( gulpif(config.reload.onTemplateChanged, connect.reload()) );
    });

    // Serve watch font files
    gulp.watch([config.paths.typo+'/'+config.typoTypes], function() {
        gulp.src('.tmp/*.html').pipe( gulpif(config.reload.onTypoChanged, connect.reload()) );
    });

    // Server watch icon files
    gulp.watch([config.paths.icons+'/**/*.svg'], function() {
        gulp.src('.tmp/*.html').pipe( gulpif(config.reload.onIconsChanged, connect.reload()) );
    });

});





/**
 * Task: BUILD
 *
 */
// ** CLEAN **
// clean - build
gulp.task('build-clean', ['serve-style', 'serve-icons', 'serve-jshint'], function() {
    getSettings();
    return gulp.src(config.paths.build).pipe(rimraf());
});

// ** STYLES **
// styles - build
gulp.task('build-styles', ['build-clean'], function() {
    var styles = {};

    // css files from .tmp
    styles.css_files = gulp.src('.tmp/styles/**/*.css');

    // bower css files
    styles.bower_css_files = gulp.src(emptyArray(bower(config.plugins.bower)))
        .pipe(ignore.exclude('!**/*.css'));

    // stream
    return streamqueue({ objectMode: true }, styles.css_files, styles.bower_css_files)
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat('app.css'))
        .pipe(cssmin())
        .pipe(rev())
        .pipe(gulp.dest(config.paths.build + '/styles'))
        .pipe(size({title: 'app.css'}));
});

// ** SCRIPTS **
// scripts - build
gulp.task('build-scripts', ['build-clean'], function() {
    var jsFilter = filter('**/*.js');
    var build = {};

    // build bower files
    build.bower_files = gulp.src(emptyArray(bower(config.plugins.bower)))
        .pipe(filter('**/*.js'));

    // build libraries files
    build.library_files = gulp.src(emptyArray(bower(config.paths.libraries)))
        .pipe(filter('**/*.js'));

    // build app scripts files
    build.app_script_files = gulp.src(config.paths.scripts)
        .pipe(angularInject({file: 'app.js', module: 'templates'}));

    // build app template files
    build.app_template_files = gulp.src(config.paths.templates)
        .pipe(htmlmin(config.plugins.htmlmin))
        .pipe(templateCache({standalone: true, module: config.templatesModule,root: './scripts/'}))

    // stream
    return streamqueue({ objectMode: true },
        build.bower_files,
        build.library_files,
        build.app_script_files,
        build.app_template_files)
        .pipe(concat('app.min.js'))
        .pipe(uglify(config.plugins.uglify))
        .pipe(rev())
        .pipe(gulp.dest(config.paths.build))
        .pipe(size({title: 'app.min.js'}));
});


// scripts pre loader - build
gulp.task('build-head-scripts', ['build-clean'], function() {
    return gulp.src(config.paths.headScripts)
        .pipe(concat('head.min.js'))
        .pipe(uglify(config.plugins.uglify))
        .pipe(rev())
        .pipe(gulp.dest(config.paths.build))
        .pipe(size({title: 'head.min.js'}));
});

// ** IMAGES **
// images - build
gulp.task('build-images', ['build-clean'], function() {
    var imgFilter = filter(config.imageTypes);

    var images = {};

    // images inside image folder
    images.app_files = gulp.src(config.paths.images)
        .pipe(imgFilter)
        .pipe( gulpif(config.use.imagemin, imagemin(config.plugins.imagemin)) )
        .pipe(imgFilter.restore())
        .pipe(gulp.dest(config.paths.build + '/images'))
        .pipe(size({title: 'All images'}));

    // images from bower libs
    images.bower_files = gulp.src(emptyArray(bower(config.plugins.bower)))
        .pipe(ignore.exclude('!' + config.imageTypes))
        .pipe(flatten({newPath: 'styles/'}))
        .pipe(gulp.dest(config.paths.build))
        .pipe(size({title: 'All bower components images'}));

    // stream
    return streamqueue( { objectMode: true }, images.app_files, images.bower_files);
});

// ** STATIC FILE **
// copy static files
gulp.task('build-copy-static-files', ['build-clean'], function() {
    return gulp.src(config.paths.staticFiles, {base: 'client'}).pipe(gulp.dest(config.paths.build));
});

// ** INJECT **
// inject - build (index.html)
gulp.task('build', ['build-scripts', 'build-styles', 'build-head-scripts', 'build-images', 'build-copy-static-files'], function(){
    var html_inject = {};

    // html file inject script into head
    html_inject.scripts_head = inject(
        gulp.src(config.paths.build + '/head*.js',{read: false}),
        {starttag: '<!-- inject:head:{{ext}} -->', ignorePath: '/' + config.paths.build, addRootSlash: false});

    // html file inject bower css, css and script files
    html_inject.script_body = inject(
        gulp.src(config.paths.build + '/app*.js',{read: false}),
        {ignorePath: '/' + config.paths.build, addRootSlash: false});

    // html file inject bower script files
    html_inject.css = inject(
        gulp.src(config.paths.build + '/styles/**/*.css',{read: false}),
        {ignorePath: '/' + config.paths.build, addRootSlash: false});

    // html file inject
    return gulp.src('client/index.html')
        .pipe(html_inject.scripts_head)
        .pipe(html_inject.script_body)
        .pipe(html_inject.css)
        .pipe(htmlmin(config.plugins.htmlmin))
        .pipe(replace('<%appversion%>',     config.version))
        .pipe(replace('<%apptitle%>',       config.title))
        .pipe(replace('<%appdescription%>', config.description))
        .pipe(replace('<%appbuild%>',       config.build))
        .pipe(gulp.dest(config.paths.build))
        .pipe(size({title: 'index.html'}));
});





/**
 * Task: BUILD-PACK
 *
 */
gulp.task('build-pack', ['build'], function(){
    gulp.src(config.paths.build + '/**/*')
        .pipe(tar(config.name + '-' + config.version + '-' + config.build + '.tar'))
        .pipe(gzip(config.plugins.gzip))
        .pipe(gulp.dest('./'));
});
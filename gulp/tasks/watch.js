var config      = require('../config'),
    path        = require('path'),
    gulp        = require('gulp'),
    gutil       = require('gulp-util');


// ['build'],
gulp.task('watch',  function() {

    gulp.watch(path.join(config.CLIENT_JS,'**', '*.js'),[
        'lint',
        'scripts'
    ]);
    // watch vendors refs
    gulp.watch( path.join(config.CLIENT_JS, 'bower.json'),[
        'wiredep',
        'scripts'
    ]);

    // watch for templates
    gulp.watch([path.join(config.CLIENT_JS,'**', '*.tpl.html')], [
        'scripts'
    ]);

    // Watch our sass files
    gulp.watch([path.join(config.CLIENT_SASS,'**', '*.sass'), path.join(config.CLIENT_SASS,'**', '*.scss')], [
        'sass'
    ]);
    // app entry point
    gulp.watch([path.join(config.CLIENT,'index.html')], [
        'html'
    ]);
    gulp.watch(path.join(config.DIST_JS, '*.*'));
    gulp.watch(path.join(config.DIST_CSS, '*.*'));
    gulp.watch(path.join(config.DIST, '*.html'));
});
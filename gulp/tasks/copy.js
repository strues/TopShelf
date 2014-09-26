var config      = require('../config'),
    path        = require('path'),
    gutil       = require('gulp-util'),
    gulp        = require('gulp');

gulp.task('copy', function() {
    gulp.src([path.join(config.CLIENT_ASSETS, "**", "*.*")]) //{ttf,woff,eof,svg}
        .pipe(gulp.dest(config.DIST_ASSETS+''));

    gulp.src([path.join(config.CLIENT, 'images', "**", "*.*")]) //{ttf,woff,eof,svg}
        .pipe(gulp.dest(path.join(config.CLIENT, 'images')));

    gulp.src([path.join(config.CLIENT, 'fonts', "**", "*.*")]) //{ttf,woff,eof,svg}
        .pipe(gulp.dest(path.join(config.DIST, 'fonts')));

    // copy angular lib:
});
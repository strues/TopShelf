/**
 * Images task
 *
 * Optimize images for dist
 *
 */

'use strict';

var gulp        = require('gulp'),
    config      = require('../config')(),
    error       = require('../util/error'),
    minifyCSS   = require('gulp-minify-css'),
    pngquant    = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
        plg     = require('gulp-load-plugins')({
                    pattern: ['gulp-*', 'gulp.*'],
                    replaceString: /^gulp(-|\.)/,
                    camelize: true,
                    lazy: true});

gulp.task('images', function () {
  return gulp.src(config.images)
    .pipe(plg.changed(config.buildC + 'assets/img/'))
    .pipe(plg.cache(plg.imagemin({
      optimizationLevel: 6,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })))
    .pipe(gulp.dest(config.buildC + 'assets/img/'));
});

gulp.task('images:sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src(config.client + 'img/icons/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));

  // Pipe image stream through image optimizer and onto disk
  spriteData.img
    .pipe(plg.imagemin())
    .pipe(gulp.dest(config.buildC + 'assets/img/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  spriteData.css
    .pipe(minifyCSS())
    .pipe(gulp.dest('src/client/styles'));
});

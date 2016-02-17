var gulp          = require('gulp');
		less          = require('gulp-less'),
		path          = require('path'),
		minifyCss     = require('gulp-minify-css'),
		browserSync   = require('browser-sync'),
		gutil         = require('gulp-util'),
		autoprefixer  = require('gulp-autoprefixer'),
		svgsprites    = require('gulp-svg-sprite'),
    sourcemaps    = require('gulp-sourcemaps'),
    imagemin      = require('gulp-tinypng'),
    imageResize   = require('gulp-image-resize'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify');

/*==============================
=           Watcher            =
==============================*/
gulp.task('watch', ['less'], function() {
  browserSync.init({ server: "./" });
  gulp.watch("./less/**/*.less", ['less']);
  gulp.watch("./js/**/*.js", ['js']);
  gulp.watch("img/svg/**/*.svg", ['svgsprites']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

/*=============================================
=            LESS and autoprefixer            =
=============================================*/
gulp.task('less', function () {
  return gulp.src('./less/**/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

/*==================================
=            JavaScript            =
==================================*/
gulp.task('js', function() {
  return gulp.src('./js/**/*.js')
	  .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});
gulp.task('minify', ['less'], function() {
  return gulp.src('./css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css/min/'));
});
gulp.task('gulp-autoprefixer', ['less'], function () {
  return gulp.src('css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'));
});

/*===========================
=            SVG            =
===========================*/
gulp.task('svgsprites', function() {
	gulp.src('./img/svg/**/*.svg')
		.pipe(svgsprites({
      shape: {
        dimension: {
          maxWidth: 32,
          maxHeight: 32,
          precision: 2
          //attributes: false
        }
      },
      mode: {
        symbol: {
          bust: false,
          sprite: 'inline-sprite.svg'
        }
      }
    }))
		.pipe(gulp.dest('./img/sprite'));
});

gulp.task('svgspriteless', function() {
  gulp.src('./img/svg/**/*.svg')
    .pipe(svgsprites({
      shape: {
        spacing: {
          padding: 1
        },
        dimension: {
          maxWidth: 32,
          maxHeight: 32,
          precision: 2
        }
      },
      mode: {
        css: {
          prefix: '.%s',
          dimensions: '%s',
          dest: './',
          sprite: 'sprite/sprite.svg',
          bust: false,
          render: {
            less: {
              dest: '../less/sprite.less'
            }
          }
        },
      }
    }))
    .pipe(gulp.dest('./img/'));
});

//Image optimization

gulp.task('tinypng', function() {
  gulp.src('img/mini/*.{jpg,png}')
    .pipe(imagemin('2dywIYbcYicKNU11BDeWwgwbkWptRk6g'))
    .pipe(gulp.dest('img/ready/'));
});

gulp.task('resize', function () {
  gulp.src('img/png/*.png')
    .pipe(imageResize({ 
      format : 'jpg',
      filter: 'Catrom',
      imageMagick: true
    }))
    .pipe(gulp.dest('img/mini/'));
});

/*==============================================================
=            Concatination and minification sctipts            =
==============================================================*/
gulp.task('scripts', function() {
  return gulp.src('js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/build/'));
});


gulp.task('default', ['watch']);
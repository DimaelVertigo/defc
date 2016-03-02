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
    uglify        = require('gulp-uglify'),
    notify        = require('gulp-notify'),
    sftp          = require('gulp-sftp'),
    eslint        = require('gulp-eslint');

/*==============================
=           Watcher            =
==============================*/
gulp.task('watch', ['less'], function() {
  browserSync.init({ server: "./" });
  gulp.watch("./less/**/*.less", ['less']);
  gulp.watch("./js/scripts.js", ['js']);
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
    .on('error', notify.onError(function(err) {
      return {
        title: 'Styles',
        message: err.message
      };
    }))
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
		.pipe(gulp.dest('./img/sprite'))
    .pipe(notify({
      message: 'SVG-sprite ready'
    }));
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
    .pipe(gulp.dest('img/mini/'))
    .pipe(notify({
      message: 'Finished otimize images'
    }));
});

/*==============================================================
=            Concatination and minification sctipts            =
==============================================================*/
gulp.task('scripts', function() {
  return gulp.src(
    [
    './js/plugins/plugins/pace.js',
    './js/plugins/TweenMax.min.js',
    './js/plugins/svg-injector.min.js',
    './js/plugins/modernizr.custom.js',
    './js/plugins/imagesloaded.pkgd.min.js',
    './js/plugins/masonry.pkgd.min.js',
    './js/plugins/classie.js',
    './js/plugins/cbpGridGallery.js',
    './js/plugins/jquery.easing.min.js',
    './js/plugins/waypoints.min.js',
    './js/plugins/jquery.debouncedresize.js',
    './js/plugins/hammer.min.js',
    './js/plugins/picturefill.js',
    './js/plugins/owl.carousel.js',
    './js/plugins/jquery.slimscroll.js',
    './js/plugins/jquery.fullPage.js'
    ])
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
    .pipe(notify({
      title: 'JavaScript',
      message: 'Finished minifying scripts'
    }));
});

/*============================
=            SFTP            =
============================*/
// gulp.task('sftp', function () {
//   return gulp.src('src/*')
//     .pipe(sftp({
//       host: 'ftp.heartbeat.agency',
//       user: 'defc@heartbeat.agency',
//       pass: 'S#aq9.ya1r3F',
//       port: '21',
//       remotePath: '/public_html/heartbeat.agency/defc/'
//     }));
// });

/*===============================
=            ES Lint            =
===============================*/
gulp.task('lint', function () {
  return gulp.src(['**/*.js','!node_modules/**'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});




gulp.task('default', ['watch']);
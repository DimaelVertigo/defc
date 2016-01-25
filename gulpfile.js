var gulp          = require('gulp');
		less          = require('gulp-less'),
		path          = require('path'),
		minifyCss     = require('gulp-minify-css'),
		browserSync   = require('browser-sync'),
		gutil         = require('gulp-util'),
		prefix        = require('gulp-autoprefixer'),
		svgsprites    = require('gulp-svg-sprite');

	// Static Server + watching scss/html files
	gulp.task('watch', ['less'], function() {
	  browserSync.init({ server: "./" });
	  gulp.watch("./less/**/*.less", ['less']);
	  gulp.watch("./js/**/*.js", ['js']);
	  gulp.watch("./img/svg/**/*.svg", ['svgsprites']);
	  gulp.watch("*.html").on('change', browserSync.reload);
	});

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

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

gulp.task('default', ['watch']);
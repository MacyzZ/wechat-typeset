var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');

gulp.task('less', function() {
  gulp.src('./src/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(rename('main.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass', function() {
  gulp.src('./src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
    gulp.src('./src/js/**/*.jsx', { read: false })
    .pipe(
      browserify({
        transform: ['reactify'],
        extensions: ['.jsx'],
        ignore: ['react', 'react-router', 'material-ui', 'react-tap-event-plugin']
      })
    )
    .pipe(rename(function(path) {
      path.extname = '.js'
    }))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('watch', function() {

  gulp.watch('./src/less/**/*.less', ['less']);

  gulp.watch('./src/sass/**/*.scss', ['sass']);

  gulp.watch('./src/js/**/*.jsx', ['js']);

  livereload.listen();

  gulp.watch('./public/**/*.*').on('change', livereload.changed);
});

gulp.task('default', ['watch']);

var browserify = require('browserify');
var gulp = require('gulp');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
// var babel = require('gulp-babel');

gulp.task('bundle', function() {
  var bundleStream = browserify({
      basedir: 'src', extensions: ['.js'], standalone: 'LC', debug: false
  }).add('LiterallyCanvas.js')
    .transform('babelify')
    .bundle()
    .on('error', function (err) {
      if (err) {
        console.error(err.toString());
      }
    });

  return bundleStream
    .pipe(source('./src/LiterallyCanvas.js'))
    .pipe(rename('index.js'))
    .pipe(gulp.dest('./lib/'));
});


gulp.task('uglify', ['bundle'], function() {
  return gulp.src(['./lib/index.js'])
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./lib'));
});


gulp.task('default', ['uglify'], function() {});


gulp.task('watch', function() {
  gulp.watch(['src/*.js', 'src/*/*.js'], ['bundle']);
});


gulp.task('dev', ['bundle', 'watch'], function() {});

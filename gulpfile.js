var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var spawn = require('child_process').spawn;
var node;

gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload());
});

gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(livereload());
});

gulp.task('browserify', function() {
    return browserify('./javascript/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/javascript'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./javascript/**/*.js', ['browserify']);
    gulp.watch('index.html', ['html']);
});

gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['index.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('run-dev', ['sass', 'browserify', 'watch', 'server']);

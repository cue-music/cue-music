var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');
var spawn = require('child_process').spawn;
var node;

/**
* Compiles SASS into a single css file in build/css folder
*/
gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload());
});

/**
* Reloads the html page for livereload
*/
gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(livereload());
});

/**
* Compiles all of the node packages that "require" in the main javascript file
* into the build/javascript folder
*/
gulp.task('browserify', function() {
    return browserify('./javascript/main.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/javascript'))
        .pipe(livereload());
});

/**
* Watches all of the sass, javascript, and index.html files and calls
* the appropriate function to complile them.
*/
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./javascript/**/*.js', ['browserify']);
    gulp.watch('index.html', ['html']);
});

/**
* Start sup a node server that hosts index.html
*/
gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['index.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

/**
 * Runs all of the necessary tasks and starts the watch and server
 * 
 * Usage:
 *      gulp run-dev
 */
gulp.task('run-dev', ['sass', 'browserify', 'watch', 'server']);

// Dependencies
var gulp = require('gulp');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var rename = require("gulp-rename");

// Default
gulp.task('default', ['watch']);

// Compile less files
gulp.task('less', function () {
    var files = ['app/less/b.less'];

    return gulp.src(files)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssnano())
        .pipe(rename('less.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

// Concat & Minify CSS files
gulp.task('CSS', function () {
    var files = ['app/css/*'];

    return gulp.src(files)
        .pipe(concat('styles.css'))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'IE 8', 'IE 9']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

// Concat & Minify JS files
gulp.task('JS', function () {
    var files = ['app/js/*'];

    return gulp.src(files)
        .pipe(concat('scripts.js', {
            newLine: ';'
        }))
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

// Watch
gulp.task('watch', ['less', 'CSS', 'JS'], function () {
    var files = ['app/**/*'];

    gulp.watch(files, ['less', 'CSS', 'JS']);
});

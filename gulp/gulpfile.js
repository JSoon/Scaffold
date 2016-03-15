// Dependencies
var gulp = require('gulp');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var stripjs = require('gulp-strip-comments');
var stripcss = require('gulp-strip-css-comments');
var rename = require('gulp-rename');
var header = require('gulp-header');
var package = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * Copyright <%= new Date().getFullYear() %> <%= pkg.author%>',
  ' * Licensed under the <%= pkg.license %> license',
  ' */',
  ''].join('\n');

// Paths
var paths = {
    app: './html/app',
    lib: './html/lib',
    dist: './html/dist'
};

// Default
gulp.task('default', ['watch']);

// Compile less files
gulp.task('less', function () {
    var files = [paths.app + '/**/*.less'];

    return gulp.src(files)
        .pipe(less())
        .pipe(rename(function (path) {
            path.dirname += '/../css';
        }))
        .pipe(gulp.dest(paths.app));
});

// Concat & Minify CSS files
gulp.task('CSS', function () {
    //    var files = ['app/css/*'];
    //
    //    return gulp.src(files)
    //        .pipe(concat('styles.css'))
    //        .pipe(rename('styles.min.css'))
    //        .pipe(gulp.dest('dist'))
    //        .pipe(sourcemaps.init())
    //        .pipe(cssnano())
    //        .pipe(autoprefixer({
    //            browsers: ['last 2 versions', '> 5%', 'IE 8', 'IE 9']
    //        }))
    //        .pipe(sourcemaps.write('.'))
    //        .pipe(gulp.dest('dist'));
});

// Concat & Minify JS files
gulp.task('JS', function () {
    //    var files = ['app/js/*'];
    //
    //    return gulp.src(files)
    //        .pipe(concat('scripts.js', {
    //            newLine: ';'
    //        }))
    //        .pipe(stripjs())
    //        .pipe(header(banner, {
    //            pkg: package
    //        }))
    //        .pipe(gulp.dest('dist'))
    //        .pipe(rename('scripts.min.js'))
    //        .pipe(sourcemaps.init())
    //        .pipe(uglify())
    //        .pipe(sourcemaps.write('.'))
    //        .pipe(header(banner, {
    //            pkg: package
    //        }))
    //        .pipe(gulp.dest('dist'));
});

// CSS sprite
gulp.task('sprite', function () {
    var files = [paths.app + '/**/*.png'];
    var spriteData = gulp.src(files).pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        imgPath: '../img/sprite.png',
        algorithm: 'top-down'
    }));

    var imgStream = spriteData.img
        .pipe(rename(function (path) {
            path.dirname += '/img';
        }))
        .pipe(gulp.dest(paths.app));
    var cssStream = spriteData.css
        .pipe(rename(function (path) {
            path.dirname += '/css';
        }))
        .pipe(gulp.dest(paths.app));

    return merge(imgStream, cssStream);
});

// Watch
gulp.task('watch', ['less', 'CSS', 'JS', 'sprite'], function () {
    var files = [paths.app + '/**/*'];

    gulp.watch(files, ['less', 'CSS', 'JS', 'sprite']);
});

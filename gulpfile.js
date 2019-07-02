var gulp = require('gulp'),
    less = require('gulp-less'),
    cleanCSS = require('gulp-clean-css'),
    pug = require('gulp-pug'),
    imagemin = require('gulp-tinypng')
    webp = require('gulp-webp'),
    svgo = require('gulp-svgo'),
    concat = require('gulp-concat');

gulp.task('build', function() {
  return gulp.src('./dev/bem/**/*.less')
    .pipe(concat('style.less'))
    .pipe(less())
    .pipe(gulp.dest('./dest/'));
});

gulp.task('css', function() {
  return gulp.src(['./dev/style/fonts/stylesheet.css', './dest/style.css'])
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dest/'));
});

gulp.task('buildcss', gulp.series(['build', 'css']));

gulp.task('tinypng', function () {
    return gulp.src(['./img_uncompressed/*jpg','./img_uncompressed/*png'])
        .pipe(imagemin('QGPG4gmnc9XpgbML2Wqcy1NP8V84TZ4v'))
        .pipe(gulp.dest('./img/'));
});
 
gulp.task('svgo', () => {
    return gulp.src('./img_uncompressed/*svg')
        .pipe(svgo())
        .pipe(gulp.dest('./img'));
});

gulp.task('compressing', gulp.series(['tinypng', 'svgo']));

gulp.task('pug', function () {
    return gulp.src('./dev/pages/*.pug')
    .pipe(pug({
            doctype: 'html',
            pretty: false
            }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
    gulp.watch('./**/*.pug', gulp.series(['pug']));
    gulp.watch('./**/*.less', gulp.series(['buildcss']));
});

gulp.task('default', gulp.series(['pug', 'buildcss', 'watch']));
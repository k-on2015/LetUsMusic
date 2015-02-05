var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var css_minify = require('gulp-minify-css');
gulp.task('lint',function(){
    gulp.src('./static/js-modify/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass',function(){
    gulp.src('./static/css-modify/*.sass')
        .pipe(sass())
        .pipe(css_minify())
        .pipe(gulp.dest('./static/css'));
});

var js_files = ['user'];

gulp.task('js',function(){
    for (i in js_files) {
        console.log(i);
        gulp.src('./static/js-modify/'+js_files[i]+'.js')
            .pipe(concat('.js'))
            .pipe(gulp.dest('./static/js'))
            .pipe(rename(js_files[i]+'.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./static/js'));
    }
});

gulp.task('jade',function(){
    var jade_files = {};
    gulp.src('./backend/template/jade/*.jade')
        .pipe(jade({
            locals:jade_files
        }))
        .pipe(gulp.dest('./backend/template/'))
});

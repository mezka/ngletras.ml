var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');


gulp.task('css', function(){
  gulp.src(['./css/style.scss'])
  .pipe(sass())
  .pipe(gulp.dest('./css/.'));
});


gulp.task('js', function(){
  gulp.src(['./js/App.js', './js/**/*.js', './views/**/*.js'])
  .pipe(concat('application.js'))
  .pipe(gulp.dest('./dist/.'));
});


gulp.task('default', ['css']);
gulp.watch(['./css/*.scss'], ['css']);

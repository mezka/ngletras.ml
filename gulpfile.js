var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');


gulp.task('css', function(){
  gulp.src(['./css/style.scss'])
  .pipe(sass())
  .pipe(gulp.dest('./css/.'));
});


gulp.task('js', function(){
  gulp.src(['./node_modules/angular/angular.js', './node_modules/angular-ui-router/release/angular-ui-router.js', './node_modules/angular-sanitize/angular-sanitize.js', './js/App.js', './js/**/*.js', './views/**/*.js'])
  .pipe(concat('application.js'))
  .pipe(gulp.dest('./dist/.'));
});


gulp.task('default', ['css']);
gulp.watch(['./css/*.scss'], ['css']);

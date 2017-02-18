var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');


gulp.task('css', function(){
  gulp.src(['./node_modules/normalize/normalize.css','./css/style.scss'])
  .pipe(concat('temp.scss'))
  .pipe(sass('style.css'))
  .pipe(gulp.dest('./css/.'));
});


gulp.task('js', function(){
  gulp.src(['./node_modules/angular/angular.js', './node_modules/angular-ui-router/release/angular-ui-router.js', './node_modules/angular-sanitize/angular-sanitize.js', './js/App.js', './js/**/*.js', './views/**/*.js'])
  .pipe(concat('application.js'))
  .pipe(gulp.dest('./dist/.'));
});


gulp.task('default', ['css', 'js']);
gulp.watch(['./js/*.js', './views/**/*.js'], ['js']);
gulp.watch(['./css/*.scss'], ['css']);

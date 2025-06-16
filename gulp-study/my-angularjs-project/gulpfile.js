const gulp = require('gulp');
const plugins = require('gulp-load-plugins')
const connect = require('gulp-connect');

// 启动本地服务器
gulp.task('server', function () {
    connect.server({
    root: './',
    livereload: true,
    port: 8088
    });
});

gulp.task('copy-bootstrap-css', function () {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('dist/css'));
  });

gulp.task('default', gulp.series('server','copy-bootstrap-css'))
const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('open');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const jshint = require('gulp-jshint');
const $ = require('gulp-load-plugins')();

// 开发服务器配置
const config = {
  port: 8080,
  devBaseUrl: 'http://localhost',
  paths: {
    html: ['src/app/**/*.html', '!src/app/views/**/*.html'],
    views: 'src/app/views/**/*.html',
    components: 'src/app/components/**/*.html',
    js: ['src/app/**/*.js', '!src/app/views/**/*.js', '!src/app/services/**/*.js', '!src/app/controllers/**/*.js'],
    controllers: 'src/app/controllers/**/*.js',
    services: ['src/app/services/api.service.js', 'src/app/services/user.service.js'],
    css: 'src/app/**/*.css',
    images: 'src/app/images/*',
    dist: 'src/dist',
    mainJs: 'src/app/app.js',
    mainHtml: 'src/app/index.html'
  }
};

// 启动开发服务器
function connectServer() {
  return connect.server({
    root: ['.', 'src/app'],
    livereload: true,
    port: config.port,
    middleware: function(connect, opt) {
      return [
        function(req, res, next) {
          // 处理 AngularJS 路由
          if (req.url.indexOf('.') === -1) {
            req.url = '/src/app/index.html';
          }
          next();
        }
      ];
    },
    fallback: 'src/app/index.html'
  });
}

// 打开浏览器
function openBrowser() {
  return open(config.devBaseUrl + ':' + config.port);
}

// 复制 HTML 文件
function html() {
  return gulp.src(config.paths.html)
    .pipe(connect.reload());
}

// 处理 JS 文件
function js() {
  return gulp.src(config.paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(connect.reload());
}

// 处理控制器文件
function controllers() {
  return gulp.src(config.paths.controllers)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(connect.reload());
}

// 处理服务文件
function services() {
  return gulp.src(config.paths.services)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(connect.reload());
}

// 处理 CSS 文件
function css() {
  return gulp.src(config.paths.css)
    .pipe(connect.reload());
}

// 监听文件变化
function watch() {
  gulp.watch(config.paths.html, html);
  gulp.watch(config.paths.views, html);
  gulp.watch(config.paths.components, html);
  gulp.watch(config.paths.js, js);
  gulp.watch(config.paths.controllers, controllers);
  gulp.watch(config.paths.services, services);
  gulp.watch(config.paths.css, css);
}

// 清理构建目录
function cleanDist() {
  return gulp.src(config.paths.dist, {read: false, allowEmpty: true})
    .pipe(clean());
}

// 复制主 HTML 文件
function copyMainHtml() {
  return gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist + '/app'));
}

// 复制视图文件
function copyViews() {
  return gulp.src(config.paths.views)
    .pipe(gulp.dest(config.paths.dist + '/app'));
}

// 复制组件文件
function copyComponents() {
  return gulp.src(config.paths.components)
    .pipe(gulp.dest(config.paths.dist + '/app'));
}

// 处理 JS 文件
function processJs() {
  return gulp.src([config.paths.mainJs, ...config.paths.js, config.paths.controllers])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist + '/app'));
}

// 处理服务文件
function processServices() {
  return gulp.src(config.paths.services)
    .pipe(concat('services.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.dist + '/app'));
}

// 处理 CSS 文件
function processCss() {
  return gulp.src(config.paths.css)
    .pipe(concat('styles.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(config.paths.dist + '/app'));
}

// 复制图片
function copyImages() {
  return gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/app/images'));
}

// 导出任务
exports.connect = connectServer;
exports.open = openBrowser;
exports.html = html;
exports.js = js;
exports.controllers = controllers;
exports.services = services;
exports.css = css;
exports.watch = watch;
exports.clean = cleanDist;

// 构建任务
exports.build = gulp.series(
  cleanDist,
  gulp.parallel(
    copyMainHtml,
    copyViews,
    copyComponents,
    processJs,
    processServices,
    processCss,
    copyImages
  )
);

// 默认任务
exports.default = gulp.parallel(connectServer, openBrowser, watch);
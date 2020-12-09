const gulp = require("gulp");
const sass = require('gulp-sass');
const less = require("gulp-less");
const uglifyCss = require("gulp-clean-css"); // 压缩 css
const uglifyJs = require('gulp-uglify'); // 压缩 js
const uglifyImg = require("gulp-imagemin"); // 压缩image
const autoprefixer = require("gulp-autoprefixer"); // css 前缀
const livereload = require("gulp-livereload"); // 自动刷新页面
//const jshint = require("gulp-jshint"); // js效验

//const rev = require("gulp-rev");
//const collector = require("gulp-rev-collector");

//const jekyll = require('gulp-jekyll');

gulp.task("sass",function () {
  return gulp.src("_sass/common.scss")
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(gulp.dest("assets/css"));
});
gulp.task("less",function () {
  return gulp.src("_sass/*.less")
    .pipe(sass())
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(gulp.dest("assets/css"));
});

gulp.task("minCSS",function () {
  return gulp.src("_sass/*.scss")
    .pipe(uglifyCss())
    //.pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(gulp.dest("assets/css"));
});
gulp.task("minJS",function () {
  return gulp.src("assets/js/*.js")
    .pipe(uglifyJS())
    //.pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(gulp.dest("assets/js"));
});
gulp.task("minImg",function () {
  return gulp.src("assets/images/*.{png,jpg,gif,ico,jpeg,svg}")
    .pipe(uglifyImg({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true,    //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true,     //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true       //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('_site/assets/images'))
    .pipe(gulp.dest("assets/images"));
});

gulp.task("default",function () {
  gulp.watch("_sass/*.scss",["sass"]);
});

//gulp.task('default',['sass','minCSS','minJS','minImg']);
/*
gulp.task('default', function () {
    gulp.src(['./index.html', './_layouts/*.html', './_posts/*.{markdown,md}'])
        .pipe(jekyll({
            source: './',
            destination: './deploy/',
            bundleExec: true
        }))
        .pipe(gulp.dest('./deploy/'));
});


//引入第三方模块
var path=require("path");
var rename=require("gulp-rename");
var browserSync = require('browser-sync');

//开启观察者watch
gulp.task("default",function () {
  gulp.watch("assets/styles/*.less",["less"]); //观察less变化执行less编译任务
  // gulp.watch("assets/styles/*.scss",["sass"]); //观察sass变化执行sass编译任务
  // gulp.watch("dist/css/*.css",["minCss"]); //观察css变化执行css压缩任务
  // gulp.watch("src/*.js",["uglifyJs"]); //观察js变化执行js压缩任务
  */
   //架设静态服务器
  //browserSync.init({
   //   files:['**/*.css','**/*.html','**/*.js'],   //监听指定文件类型，自动刷新浏览器
  //  server:{
   //     baseDir:'./', // 设置服务器的根目录
  //    index:'index.html' // 指定默认打开的文件
  //  },
   //   port:8888 // 指定访问服务器的端口号
  //});
//});*/


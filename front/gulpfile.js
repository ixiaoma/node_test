/**
 * Created by hasee on 2016/7/5.
 */
var gulp = require('gulp');
var sass = require('gulp-sass'); //容易出错 plus //css的预处理语言
var webserver = require("gulp-webserver");

/*js*/
var rename =  require("gulp-rename");//改名
/*css*/
var concat =  require("gulp-concat"); //拼接
var autoprefixer = require("gulp-autoprefixer"); //css后处理器
var minifyCSS =  require("gulp-minify-css");

var imagemin = require('gulp-imagemin');//容易出错


/*开启一个服务器*/
gulp.task("webserver",function(){
    gulp.src("./")
        .pipe(webserver({
            livereload: true, /*修改文件自动刷新*/
            directoryListing: {  /*要不要显示目录，开发环境下可以显示*/
                enable:true,
                path: './'  /*有哪个目录下开始访问*/
            },
            port: 82, /*端口号*/
            host: 'localhost'
        }))
});

gulp.task("styles",function(){
    gulp.src("src/sass/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: false, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(minifyCSS())
       /* .pipe(concat("index.min.css"))*/

        .pipe(gulp.dest("app/css/"))
});

gulp.task('copyCss',function () {
    gulp.src("src/css/*.css")
        .pipe(minifyCSS())
        .pipe(gulp.dest("app/css/"))
});


gulp.task("copyHtml",function(){
    gulp.src("src/*.html")
        .pipe(gulp.dest("app/"))
});


gulp.task("copyJs",function(){
    gulp.src("src/js/libs/*.js")
        .pipe(gulp.dest("app/js/libs/"))
});

gulp.task("scripts",function(){
    gulp.src("src/js/*.js")
      
        // .pipe(uglify())
        .pipe(gulp.dest("app/js/"))
});

/*创建一个图片压缩的任务*/
gulp.task("images",function(){
    return gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("app/images/"))
});

gulp.task("watch",function(){
    gulp.watch("src/css/*.css",["copyCss"]);
    gulp.watch("src/sass/*.scss",["styles"]);
    gulp.watch("src/*.html",["copyHtml"]);
    gulp.watch("src/images/*",["images"]);
    gulp.watch("src/js/*.js",["scripts"])
    gulp.watch("src/js/libs/*.js",["copyJs"])
});

//默认任务去执行所有任务
gulp.task("default",["styles","watch","copyCss","copyHtml","images","copyJs","scripts",
"webserver"]);


//把src里面的文件编译打包到app里面
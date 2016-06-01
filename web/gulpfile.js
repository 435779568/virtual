var  gulp=require('gulp'), 
     data= require('gulp-data'),
     replace=require('gulp-replace'),
     nunjucksRender = require('gulp-nunjucks-render'),
     merge = require('merge-stream');
     pathUtil = require('path'),
     rename= require('gulp-rename'),
     cssmin = require('gulp-minify-css'),
     sass=require('gulp-sass'),
     uglify = require('gulp-uglify'),
     concat=require('gulp-concat'),

     livereload = require('gulp-livereload');
     livereload({ start: true });

var path={
     sass:'./resource/sass',
     css:'./resource/css',
     lib:'./resource/lib',
     layout:'html',
     tpl:"./html/tpl",
     js:'./resource/js'
};
//编译sass
gulp.task('sass',function()
{
    return gulp.src([path.sass+"/**/*.scss"])
            .pipe(sass())
            //.pipe(rename("pages.css"))
            //.pipe(cssmin())
            // .pipe(rename({
            //    suffix: ".min",
            // }))
            .pipe(gulp.dest(path.css));
});  


gulp.task('concat',['sass'],function()
{
    var concatCss=gulp.src([path.css+"/**/*.css",
               "!"+path.css+"/main.css",
               "!"+path.css+"/main.min.css",
               path.lib+"/**/*.css",
               "!"+path.lib+"/**/*.min.css"])
            //.pipe(rename("pages.css"))
            .pipe(concat("main.css"))
            .pipe(cssmin({keepBreaks:true,
                keepSpecialComments:0}))
            .pipe(rename({
               suffix: ".min",
            }))
            .pipe(gulp.dest(path.css));

    var concatJs=gulp.src([
               "!"+path.lib+"/jquery/jquery.min.js", 
               path.js+"/vue.js",
               path.lib+"/**/*.js",
               path.js+"/**/*.js",
               "!"+path.js+"/main.js",
               "!"+path.js+"/main.min.js",
               "!"+path.lib+"/**/*.min.js"])
            .pipe(concat("main.js"))
            //.pipe(uglify())
            // .pipe(rename({
            //    suffix: ".min",
            // }))
            .pipe(gulp.dest(path.js));
    return merge(concatCss,concatJs);
});   

 gulp.task('nunjucks',function()
    {
        nunjucksRender.nunjucks.configure([path.layout], { autoescape: false });
        return gulp.src(path.tpl+'/**/*.tpl.html')
        .pipe(nunjucksRender(
            { path: [path.layout]}))
        .pipe(rename(function (path) {
            path.basename =path.basename.split('.tpl')[0];
            path.extname = ".html";
        }))
        .pipe(gulp.dest('./html/view'))
        .pipe(livereload());
    });

 gulp.task('watch',function()
{
   livereload.listen({host:"127.0.0.1",port:2000,basePath:"./resource"});
   gulp.watch([path.css+"/**/*.css",
     "!"+path.css+"/**/*.min.css",
     path.sass+"/**/*.scss",
     path.layout+"/**/*.html",
     path.tpl+"/**/*.html"
     ],['nunjucks']);
});

gulp.task('default',function()
{
     gulp.start('concat');
});




















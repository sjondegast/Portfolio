const gulp = require("gulp");const del = require("del");const usemin = require("gulp-usemin");const rev = require("gulp-rev");const cssnano = require("gulp-cssnano");const uglify = require("gulp-uglify");const bs  = require("browser-sync");gulp.task("previewServer" ,function(){    bs.init({        server:{            baseDir: "docs"        },        notify: false    });});gulp.task("deleteDist", function(){    return del("./docs");    });gulp.task("copySvg", ["deleteDist", "copyImg"], function () {    return gulp.src(["./app/assets/images/icons/*.svg"])        .pipe(gulp.dest("./docs/assets/images/icons/"));});gulp.task("copyImg", ["deleteDist"], function () {    return gulp.src(["./app/assets/images/*.png"])        .pipe(gulp.dest("./docs/assets/images/"));});gulp.task("copyDocument", ["deleteDist"], function () {    return gulp.src(["./app/assets/documents/*.docx"])        .pipe(gulp.dest("./docs/assets/documents"));});gulp.task("copySetup", ["deleteDist"], function(){   return gulp.src("./app/assets/*.json")       .pipe(usemin({           js:[function(){ return rev()}]       }))       .pipe(gulp.dest("./docs/assets/"))});gulp.task("copyAndMinify", ["deleteDist", "scripts", "styles"] , function(){    return gulp.src("./app/index.html")        .pipe(usemin({            css: [function(){return rev()}, function(){return cssnano()}],            js: [function(){return rev()}, function(){return uglify()}]        }))        .pipe(gulp.dest("./docs/"))});gulp.task("build", ["deleteDist","copySvg", "copyAndMinify", "copySetup", "copyDocument"]);
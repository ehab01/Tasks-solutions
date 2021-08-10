const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();
const babelTransform = require('gulp-babel');
 

var jsFiles =[
    "src/assets/js/*js",
];

var scssFiles =[
    "src/assets/styles/scss/styles.scss"
];

var images=[ 
    "src/assets/images*/**/*"
];
var vendors =[
    "src/assets/js/vendors*/**/*"
];

var htmlFIles =[
    "src/index.html"
];

var polyfillFile ="node_modules/babel-polyfill/dist/polyfill.js";





// Sass Task
function scssTask() {
  return src(scssFiles, { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist/assets/styles", { sourcemaps: "." }));
}

// JavaScript Task
function jsTask() {
  return src(jsFiles, { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist/assets/js", { sourcemaps: "." }));
}

//copy images task

function copyImages(){
   
        return src(images)
          .pipe(dest('dist/assets/'));
 
}
//copy vendors task
function copyJsVendors(){
   
    return src(vendors)
      .pipe(dest('dist/assets/js'));

}
//copy html 
function copyHtml()
{
    return src(htmlFIles)
    .pipe(dest('dist'));
}
//copy babel polyfill
function copyPolyfill()
{
    return src(polyfillFile)
    .pipe(dest('dist/assets/js/public-js'));
}
//
async function copyFiles(){
    await copyJsVendors();
    await copyImages();
    await copyPolyfill();
    await copyHtml();
}
//babel runtime transform
function runtimeTransform()
{
   return src(['src/assets/js/services.js','src/assets/js/main.js'])
        .pipe(babelTransform({
            plugins: ['@babel/transform-runtime']
        }))
        .pipe(dest('dist/assets/js'));
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "dist",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browserSyncReload);
  watch(
    ["src/assets/styles/scss/**/*.scss", "src/assets/js/**/*.js"],
    series(scssTask,runtimeTransform ,jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask,runtimeTransform, jsTask,copyFiles,browserSyncServe, watchTask);
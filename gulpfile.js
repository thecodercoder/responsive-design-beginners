const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const bs = require('browser-sync').create();

function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }));
}

function browsersyncServe(cb) {
  bs.init({
    server: '.',
  });
  cb();
}

function browsersyncReload(cb) {
  bs.reload();
  cb();
}

function watchTask() {
  watch('*.html', browsersyncReload);
  watch('app/scss/**/*.scss', series(scssTask, browsersyncReload));
}

exports.default = series(scssTask, browsersyncServe, watchTask);
exports.build = scssTask;

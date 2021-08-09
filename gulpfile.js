const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const less = require("gulp-less");
const sync = require("browser-sync").create();

// Styles

const styles = () => {
  return gulp.src([
    "source/less/global/*",
    "source/less/bem/*",
  ])
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(concat('styles.css'))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);

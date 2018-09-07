const path = require('path')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-clean-css')
const pxtorem = require('gulp-pxtorem')
const rename = require('gulp-rename')

const sassOptions = {
  includePaths: [
    './node_modules/bourbon/app/assets/stylesheets/',
    './node_modules/susy/sass'
  ],
  errLogToConsole: true,
  outputStyle: 'expanded'
}

const pxtoremOptions = {
  replace: false,
  prop_white_list: ['font', 'font-size', 'line-height', 'letter-spacing', 'margin', 'padding', 'border', 'border-top', 'border-left', 'border-bottom', 'border-right', 'border-radius', 'width', 'height', 'top', 'left', 'bottom', 'right']
}

module.exports = function (gulp, plugins) {
  return function () {
    gulp.src(['app/css/app.scss'])
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(minifyCSS())
      .pipe(pxtorem(pxtoremOptions))
      .pipe(rename('app.min.css'))
      .pipe(gulp.dest('.'))
  }
}
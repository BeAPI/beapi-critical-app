/*Load all plugin define in package.json*/
const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()

function getTask(task) {
  return require('./tasks/' + task)(gulp, plugins)
}

// Scripts
gulp.task('scripts', getTask('scripts'))

// Styles
gulp.task('sass', getTask('sass'))

// Electron
gulp.task('electron', getTask('electron'))

// Gulp Assets Build
gulp.task('build', ['scripts', 'sass'])

// Gulp Default Task
gulp.task('default', ['scripts', 'sass'], function () {
  gulp.watch('app/*', ['electron'])
  gulp.watch('app/js/*.js', ['scripts'])
  gulp.watch(['app/css/*.scss', 'app/css/**/*.scss'], ['sass'])
});
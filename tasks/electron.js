runElectron = require('gulp-run-electron')

module.exports = function (gulp) {
  return function () {
    gulp.src('app')
      .pipe(runElectron(["--cli-argument", "--another"], { cwd: "path" }))
  }
}

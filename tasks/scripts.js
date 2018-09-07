const concat = require('gulp-concat-sourcemap')
const uglify = require('gulp-uglify-es').default
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const source = require('vinyl-source-stream')

module.exports = function (gulp) {
	const b = browserify({
		entries: './app/js/app.js'
	});

	return function () {
		// Make the rest
		b
			.bundle()
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(uglify())
			.pipe(concat('app.min.js', { sourceRoot: '../../' }))
			.pipe(gulp.dest('.'))
	}
}
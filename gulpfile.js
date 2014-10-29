var gulp    = require('gulp')
  , dev     = require('./tasks/development')
  , assets  = require('./tasks/assets');

gulp.task('dev-server',    dev.devServer)

gulp.task('assets-less',   assets.less)

gulp.task('lib-clean',     assets.clean)
gulp.task('lib-compile',   ['lib-clean'], assets.compile)

gulp.task('lib',     [ 'lib-clean', 'lib-compile'])
gulp.task('assets',  [ 'assets-fonts', 'assets-less'])

gulp.task('release', [ 'lib', 'assets', 'docs', 'browser']);

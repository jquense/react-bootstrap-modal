var gulp    = require('gulp')
  , dev     = require('./tasks/development')
  , assets  = require('./tasks/assets');

gulp.task('dev-server',  dev.devServer)

gulp.task('lib-clean',   assets.clean)
gulp.task('lib-compile', ['lib-clean'], assets.compile)
gulp.task('lib-less',    ['lib-clean'], assets.less)

gulp.task('lib',     [ 'lib-clean', 'lib-compile', 'lib-less'])

gulp.task('release', [ 'lib']);

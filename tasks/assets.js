var gulp = require('gulp')
  , less = require('gulp-less')
  , replace = require('gulp-replace')
  , clean = require('gulp-clean')
  , gulpReact = require('gulp-react')
  , plumber = require('gulp-plumber');

module.exports = {

  less: function(){
    gulp.src('./src/less/react-listview.less')
        .pipe(plumber())
        .pipe(less({ compress: true }))
        .pipe(gulp.dest('./dist/css'));
  },

  clean: function(){
      return gulp.src('./lib/*', { read: false })
          .pipe(clean())
  }, 

  compile: function(){
      gulp.src('./src/**/*.js')
        .pipe(gulp.dest('./lib'))

      return gulp.src('./src/**/*.jsx')
          .pipe(plumber())
          .pipe(gulpReact({ harmony: true }))
          .pipe(replace(/.jsx/g, ''))
          .pipe(gulp.dest('./lib'));
  }
  
}

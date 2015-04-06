'use strict';
var gulp    = require('gulp')
  , less    = require('gulp-less')
  , rimraf  = require('rimraf')
  , plumber = require('gulp-plumber')
  , merge   = require('merge-stream')
  , configs = require('./webpack.configs')
  , rename  = require('gulp-rename')
  , babelTransform = require('gulp-babel-helpers')
  , webpack = require('webpack')
  , WebpackDevServer = require('webpack-dev-server');


gulp.task('clean', function(cb){
  rimraf('./lib', cb);
})

gulp.task('less-compile', ['clean'], function(){

  return merge(
    gulp.src('./src/less/rbm-complete.less')
      .pipe(plumber())
      .pipe(less({ compress: true }))
      .pipe(gulp.dest('./lib/styles')),
    gulp.src('./src/less/rbm-patch.less')
      .pipe(plumber())
      .pipe(less({ compress: true }))
      .pipe(gulp.dest('./lib/styles'))
  )
  
})

gulp.task('less-copy', ['clean'], function(){
  return gulp.src('./src/less/*.less')
    .pipe(gulp.dest('./lib/styles'))
})

gulp.task('transpile', ['clean'], function(){

  return gulp.src(['./src/**/*.jsx', './src/**/*.js'])
      .pipe(plumber())
      .pipe(babelTransform(
          configs.babel
        , './util/babelHelpers.js'
        , './lib/util/babelHelpers.js'))
      .pipe(rename({ extname: '.js' }))
      .pipe(gulp.dest('./lib'));
})


gulp.task('docs', function() {

  new WebpackDevServer(webpack(configs.dev), {
    publicPath: '/docs',
    hot: true,
    stats: { colors: true }
  })
  .listen(8080, 'localhost', function (err) {
    if (err) 
      return console.log(err);
    
    console.log('Listening at localhost:8080');
  });
})

gulp.task('release', ['clean', 'less-compile', 'less-copy', 'transpile'])
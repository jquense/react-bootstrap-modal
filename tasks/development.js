var gulp    = require('gulp')
  , configs = require('./webpack.configs')
  , WebpackDevServer = require("webpack-dev-server")
  , webpack = require('webpack');

var assets  = require('./assets');

gulp.task('watch-less',  assets.less)

module.exports = {

  devServer: function() {

    gulp.watch('./src/less/**/*.less',  ['watch-less']);
    
    new WebpackDevServer(webpack(configs.dev), {
      publicPath: "/dev",
      stats: { colors: true }
    }).listen(8080, "localhost");

  }
}


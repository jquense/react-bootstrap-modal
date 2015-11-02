var path = require('path')
  , webpack = require('webpack')
  , ExtractTextPlugin = require("extract-text-webpack-plugin")
  , pkg = require('./package.json');



module.exports = {

  babel: pkg.babel,

  doc:

  dev: makeConfig({

    devtool: 'source-map',

    hot: false,

    extractStyles: false,

    styleName: 'public/docs.css',

    entry:'./docs/dev.jsx',

    output: {
      path: path.join(__dirname, './docs/public'),
      filename: 'docs.js'
    },

    externals: {
      'babel/browser': 'window.babel'
    },

    loaders: [{ test: /\.json$/, loader: "json" }],
  }),

  test: 
}

var path = require('path')
  , webpack = require('webpack')
  , pkg = require("../package.json")
  , ProdDefine = new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    })

module.exports = {

  browser: {

    entry: './index.js',

    output: {
      path: path.join(__dirname, "./browser"),
      filename: 'react-listview.js',
      library:  'ReactListview',
      libraryTarget: 'this'
    },

    externals: {
      'react':  'window.React'
    },

    plugins: [
      ProdDefine,
      
      new webpack.BannerPlugin( 
        "v" + JSON.stringify(pkg.version) + " | (c) " + (new Date).getFullYear() + " Jason Quense | "
        + "https://github.com/theporchrat/react-listview/blob/master/License.txt"
        , { entryOnly : true }),

      new webpack.optimize.UglifyJsPlugin()
    ],
  },

  dev: {

    devtool: 'source-map',
    entry: './dev/dev.jsx',
    output: {
      filename: "dev.js",
      path: path.join(__dirname, "./dev"),
      publicPath: "dev/"
    },

    module: {
      loaders: [
        { test: /\.jsx$/,  loader: 'jsx-loader?harmony=true&insertPragma=React.DOM' }
      ]
    },
  },

  test: {
    devtool: 'source-map',
    cache: true,
    module: {
      loaders: [
        { test: /\.jsx$/, loader: 'jsx-loader?harmony=true&insertPragma=React.DOM' },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      ],
    },
  }
}
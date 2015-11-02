var makeConfig = require('./make-config');
var path = require('path')

module.exports = makeConfig({

  styleName: 'docs.css',

  entry: './docs/dev.jsx',

  output: {
    path: path.join(__dirname, './docs/public'),
    filename: 'docs.js',
    publicPath: '/docs/'
  },

  loaders: [
    { test: /\.json$/, loader: "json" }
  ]
})

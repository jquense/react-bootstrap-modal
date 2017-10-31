
const path = require('path')
const { plugins, rules, loaders } = require('webpack-atoms');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './examples/dev.js',

  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'main.js',
    publicPath: '/docs'
  },
  module: {
    rules: [
      rules.js(),
      rules.images(),
      rules.fonts(),
      rules.css(),
      rules.less(),
      {
        test: /\/raw\//,
        use: loaders.raw(),
      }
    ],
  },
  plugins: [
    plugins.extractText(),
    plugins.html(),
  ]
}

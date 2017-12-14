const LiveReloadPlugin = require('webpack-livereload-plugin')
const isDev = process.env.NODE_ENV === 'development'
//import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = {
  entry: './client/index.js',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
    {
      test: /\.scss$|\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    }
    ]
  },

  plugins: isDev ? [new LiveReloadPlugin({appendScriptTag: true})] : []
}

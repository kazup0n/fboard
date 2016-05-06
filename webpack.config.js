var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    './js/index.js',
  ],
  output: { path:  './public/assets/js', filename: 'bundle.js', publicPath: 'assets/js' },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
       {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        loader: "file?name=[name].[ext]",
      }
    ]
  },
  devServer: {
    // Document Root
    contentBase: "./public",
    // 動作ポート指定
    port: 8080,
    // hotモード有効化
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  plugins: [
  ],
}
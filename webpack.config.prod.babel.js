import autoprefixer from 'autoprefixer';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
import ExtractTextPlugin from 'extract-text-webpack-plugin';
let path = require('path');

module.exports = {
  entry: ["babel-polyfill", "./src/assets/js/main.js"],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style-loader', 'css-loader'),
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract(
        'style-loader', 'css-loader?modules!postcss-loader!stylus-loader'),
    }, {
      test: /\.pug$/,
      loader: 'pug-loader?pretty'
    }, {
      test: /\.html$/,
      loader: 'file-loader'
    }, {
      test: /\.(eot|otf|woff|woff2|ttf|svg)$/,
      loader: 'url-loader?limit=30000&name=[name].[ext]',
    }, {
      test: /\.(png|jpg)$/,
      loader: 'file-loader?name=[name].[ext]',
    }],
  },
  output: {
    filename: 'main.js',
    path: path.resolve('dist')
  },
  postcss() {
    return [autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9'],
      remove: false
    })];
  },
  plugins: [
    new ExtractTextPlugin('main.css'),

    // Optimizes the order that the files are bundled
    new webpack.optimize.OccurenceOrderPlugin(),

    // Eliminates duplicated packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
    }),
    new HtmlWebpackPlugin({
      filename: 'links.html',
      template: './src/pages/links.pug',
    })
  ],
  resolve: {
    extensions: ['', '.js', '.pug', '.styl']
  }
};
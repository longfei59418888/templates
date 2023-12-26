import * as webpack from 'webpack'
import merge from 'webpack-merge'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

import base from './base'

const cwd = process.cwd()


const config: webpack.Configuration &
  Pick<webpack.WebpackOptionsNormalized, 'devServer'> = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(cwd, 'dist'),
    filename: '[name].js', // string (default)
    pathinfo: false,
    publicPath:'/'
  },
  // cache: {
  //   type: 'filesystem',
  //   cacheDirectory: path.resolve(cwd, 'scripts/.cache/webpack/local'),
  // },
  devServer: {
    static: path.resolve(cwd, 'dist'),
    historyApiFallback: true,
    compress: true,
    open: true,
    hot: true,
    host: '0.0.0.0',
    port: 9000,
    allowedHosts: [
      'golingo.unipus.cn',
    ]
  },
  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(cwd, 'public/index.html'),
      chunks: ['app'],
      cache: true,
    }),
  ],
}

export default merge(base, config)

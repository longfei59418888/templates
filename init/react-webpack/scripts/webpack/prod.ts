const HtmlWebpackPlugin = require('html-webpack-plugin')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
import * as webpack from 'webpack'
import merge from 'webpack-merge'

import base from './base'
import * as path from 'path'

const config: webpack.Configuration &
  Pick<webpack.WebpackOptionsNormalized, 'devServer'> = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'js/[name]-[chunkhash:6].js',
    chunkFilename: 'js/[name]-[chunkhash:6].js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    // build 时候会进行 ts 检查，加入插件后 ts-loader transpileOnly 默认为true
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../public/index.html'),
      chunks: ['libs', 'react', 'antd', 'ui', 'app'],
    }),
    process.env.OPTIMIZE ? new BundleAnalyzerPlugin() : null,
  ],
  optimization: {
    moduleIds: 'deterministic',
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      minSize: 30000,
      minChunks: 1,
      cacheGroups: {
        libs: {
          name: 'libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial',
        },
        antd: {
          name: 'antd',
          priority: 20,
          test: /[\\/]node_modules[\\/](antd|rc|@ant|@rc)(.*)/,
        },
        react: {
          name: 'react',
          priority: 30,
          test: /[\\/]node_modules[\\/]_?react(.*)/,
        },
        chunkUi: {
          name: 'ui',
          priority: 40,
          test: /[\\/]node_modules[\\/]_?xl-story-book(.*)/,
        },
      },
    },
  },
}

export default merge(base, config)

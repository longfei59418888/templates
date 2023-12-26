import { resolve } from 'path'
import * as webpack from 'webpack'
import * as path from 'path'
import * as dotenv from 'dotenv'

const cwd = process.cwd()

const GLOBAL_CONFIG = {
  ...dotenv.config({
    path: path.resolve(__dirname, '../config/.env'), // 配置文件路径
    encoding: 'utf8', // 编码方式，默认utf8
  }).parsed,
  ...dotenv.config({
    path: path.resolve(__dirname, `../config/.env.${process.env.ENV ?? 'dev'}`), // 配置文件路径
    encoding: 'utf8', // 编码方式，默认utf8
  }).parsed,
}

const config: webpack.Configuration = {
  entry: {
    app: './src/main.tsx',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@src': resolve(cwd, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // 关闭检查
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: ['thread-loader', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf])/,
        type: 'asset',
        generator: {
          filename: 'img/[contenthash][ext][query]', // 局部指定输出位置
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      GLOBAL_CONFIG: JSON.stringify(GLOBAL_CONFIG),
    }),
  ],
}

export default config

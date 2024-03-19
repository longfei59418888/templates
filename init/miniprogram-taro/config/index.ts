import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import path from 'path'

import devConfig from './dev'
import prodConfig from './prod'
import envConfig from './helper/env'

const prefix = 'xl-'

const defineConstants = envConfig('./config')

export default defineConfig(async (merge, {}) => {
  const baseConfig: UserConfigExport = {
    projectName: 'miniprogram-sdk',
    date: '2024-1-3',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    sass: {
      resource: [path.resolve('src/styles/variables.scss'), path.resolve('src/styles/mixins/index.scss')],
      data: `$name: "${prefix}"; `,
    },
    defineConstants: {
      PREFIX: JSON.stringify(prefix),
      ...defineConstants,
    },
    copy: {
      // patterns: [{ from: 'static', to: 'dist' }],
      patterns: [],
      options: {},
    },
    framework: 'react',
    compiler: 'webpack5',
    cache: {
      enable: true,
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 2 * 1024,
          },
        },
        cssModules: {
          enable: true,
          config: {
            namingPattern: 'module',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
      },
    },
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})

export default {
  plugins: {
    '@tailwindcss/postcss': {},
    'postcss-preset-env': {
      stage: 1,
    },
    'postcss-normalize': {},
    'postcss-pxtorem': {
      // {rootValue}px 转换为 1rem
      rootValue: 16,
      propList: ['*'],
      selectorBlackList: [
        '.toaster',
        '.wp-block-post-content',
      ], // (Array) 要忽略并保留为 px 的选择器.
      exclude: /node_modules/i,
      minPixelValue: 1,
      unitPrecision: 3,
      mediaQuery: false,
    },
    'postcss-functions': {
      functions: {
        pow: (base, exponent) => Math.pow(base, exponent),
        double: (num) => num * 2,
      },
    },
  },
};

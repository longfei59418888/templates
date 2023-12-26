module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    'react-hot-loader/babel',
    [
      'import',
      {
        libraryName: 'xl-story-book',
        style: 'css',
      },
    ],
  ],
}

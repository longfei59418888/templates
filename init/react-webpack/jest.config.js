module.exports = {
  roots: ['<rootDir>/src/'],
  transform: {
    '^.+\\.[jt]sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(c|le|sa|sc)ss$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|xlsx|csv)$':
      '<rootDir>/jest/mocks/file.ts',
    '@/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['<rootDir>/jest/matchers.setup.ts'],
  snapshotSerializers: [],
  testEnvironment: 'node',
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['json', 'html', 'lcov', 'text', 'clover'],
}

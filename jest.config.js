module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js$': '<rootDir>/jest.transform.js',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.jsx?$',
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  setupFilesAfterEnv: ['./react-testing-library.setup.js'],
  moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',
    },
}
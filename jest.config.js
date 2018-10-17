module.exports = {
  testURL: 'http://localhost/',
  verbose: true,
  setupFiles: ['<rootDir>/tests/setup.js'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  }
};

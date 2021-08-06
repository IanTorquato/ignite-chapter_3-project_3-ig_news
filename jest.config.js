module.exports = {
  moduleNameMapper: {
    '\\.(scss|css|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv : [
    '<rootDir>/src/tests/setupTests.ts'
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [    '/node_modules/',  '/.next/', '/out/', '/build/'  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  }
};

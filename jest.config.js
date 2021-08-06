module.exports = {
  setupFilesAfterEnv : [
    '<rootDir>/src/tests/setupTests.ts'
  ],
  testEnvironment: 'jsdom',
  testIgnorePatterns: [    '/node_modules/',  '/.next/', '/out/', '/build/'  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  }
};

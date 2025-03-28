module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest', 
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', 
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  }
  
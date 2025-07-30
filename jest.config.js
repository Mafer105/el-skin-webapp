module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],

  transformIgnorePatterns: [
    '/node_modules/(?!react-router-dom|@remix-run/router|react-router)/',
  ],
  
  moduleNameMapper: {

    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/test-utils.tsx',
    '!src/index.tsx',
    '!src/main.tsx',
  ],
};
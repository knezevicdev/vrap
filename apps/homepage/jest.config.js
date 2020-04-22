// https://github.com/zeit/next.js/tree/master/examples/with-jest
module.exports = {
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  // setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '../../node_modules/babel-jest',
    // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
    //   '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
};

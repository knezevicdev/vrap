// https://github.com/zeit/next.js/tree/master/examples/with-jest
module.exports = {
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/src/modules/inventory/Santader/**',
  ],
  // setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/product/src/modules/inventory/Santader/',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
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
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  reporters: ['default', 'jest-junit'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
};

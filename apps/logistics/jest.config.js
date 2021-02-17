// https://github.com/zeit/next.js/tree/master/examples/with-jest
module.exports = {
  setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  // setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    // '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^.+\\.(ts|tsx)$': 'ts-jest',
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

/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/src/stories/**',
    '!**/src/jest/**',
    '!**/src/pages/api/jest/**',
    '!.storybook/**',
    '!./src/core/store/CatStore.ts',
    '!coverage/lcov-report/**',
    '!**/src/pages/api/**',
    '!.eslintrc.js',
    '!.prettierrc.js',
    '!jest.config.js',
    '!next.config.js',
  ],
  moduleNameMapper: {
    '^src(.*)$': '<rootDir>/src$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  coverageReporters: [
    'clover',
    'cobertura',
    'json',
    'json-summary',
    'lcov',
    'text',
  ],
  reporters: ['default', 'jest-junit'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
};

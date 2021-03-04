module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  reporters: ['default'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
      babelConfig: true,
    },
  },
};

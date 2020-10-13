module.exports = {
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
};

// "jest": {
//   "moduleFileExtensions": [
//     "ts",
//     "tsx",
//     "js"
//   ],
//   "transform": {
//     "\\.(ts|tsx)$": "ts-jest"
//   },
//   "testRegex": "/__tests__/.*\\.(ts|tsx|js)$"
// }

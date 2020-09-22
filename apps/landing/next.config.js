/* eslint-disable @typescript-eslint/no-var-requires */

const childProcess = require('child_process');
const shortHash = childProcess
  .execSync('git rev-parse --short=8 HEAD')
  .toString()
  .trim();

const basePath = '/landing';

const config = {
  basePath,
  distDir: `.next/${shortHash}`,
  generateBuildId: () => shortHash,
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
  webpack: (config) => {
    return config;
  },
};

module.exports = config;

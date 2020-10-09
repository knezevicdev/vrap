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
  publicRuntimeConfig: {
    BASE_PATH: basePath,
    NODE_ENV: process.env.NODE_ENV,
    SEGMENT_WRITE_KEY: process.env.SEGMENT_WRITE_KEY,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff2|woff|eot|ttf|otf)$/,
      use: ['file-loader'],
    });
    config.resolve.modules.push(__dirname);
    return config;
  },
};

module.exports = config;

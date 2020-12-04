/* eslint-disable @typescript-eslint/no-var-requires */

const { name, version } = require('./package.json');

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
    DATA_DOG_RUM_APPLICATION: process.env.DATA_DOG_RUM_APPLICATION,
    DATA_DOG_RUM_TOKEN: process.env.DATA_DOG_RUM_TOKEN,
    NAME: name,
    NODE_ENV: process.env.NODE_ENV,
    SEGMENT_WRITE_KEY: process.env.SEGMENT_WRITE_KEY,
    VERSION: version,
    INVSEARCH_V3_URL: process.env.INVSEARCH_V3_URL,
    GEARBOX_PRIVATE_URL: process.env.GEARBOX_PRIVATE_URL,
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

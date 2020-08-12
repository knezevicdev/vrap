/* eslint-disable @typescript-eslint/no-var-requires */

const { name, version } = require('./package.json');

const childProcess = require('child_process');
const shortHash = childProcess
  .execSync('git rev-parse --short=8 HEAD')
  .toString()
  .trim();

const basePath = '/apps/listing';

module.exports = {
  basePath,
  distDir: `.next/${shortHash}`,
  generateBuildId: () => shortHash,
  publicRuntimeConfig: {
    // Will be available on both server-side and client-side
    BASE_PATH: basePath,
    INVSEARCH_V3_URL: process.env.INVSEARCH_V3_URL,
    NAME: name,
    SHORT_HASH: shortHash,
    STATIC_ASSETS_HOST_URL: process.env.STATIC_ASSETS_HOST_URL,
    VERSION: version,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    SEGMENT_WRITE_KEY: process.env.SEGMENT_WRITE_KEY,
  },
  /* Custom webpack configuration. */
  webpack: (config) => {
    /* Enable SVG imports. */
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });
    /* Enable imports relative to the project root. */
    config.resolve.modules.push(__dirname);
    return config;
  },
};
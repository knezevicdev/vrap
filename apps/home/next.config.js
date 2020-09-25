/* eslint-disable @typescript-eslint/no-var-requires */

const { name, version } = require('./package.json');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const childProcess = require('child_process');
const shortHash = childProcess
  .execSync('git rev-parse --short=8 HEAD')
  .toString()
  .trim();

const basePath = '/home';

const config = {
  basePath,
  distDir: `.next/${shortHash}`,
  generateBuildId: () => shortHash,
  publicRuntimeConfig: {
    // Will be available on both server-side and client-side
    BASE_PATH: basePath,
    DATA_DOG_RUM_APPLICATION: process.env.DATA_DOG_RUM_APPLICATION,
    DATA_DOG_RUM_TOKEN: process.env.DATA_DOG_RUM_TOKEN,
    GEARBOX_PRIVATE_URL: process.env.GEARBOX_PRIVATE_URL,
    GEARBOX_PUBLIC_URL: process.env.GEARBOX_PUBLIC_URL,
    INVSEARCH_V3_URL: process.env.INVSEARCH_V3_URL,
    NAME: name,
    STATIC_ASSETS_HOST_URL: process.env.STATIC_ASSETS_HOST_URL,
    VERSION: version,
    BRANCH_IO_KEY: process.env.BRANCH_IO_KEY,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    SANTANDER_SEGMENT_WRITE_KEY: process.env.SANTANDER_SEGMENT_WRITE_KEY,
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

module.exports = withBundleAnalyzer(config);

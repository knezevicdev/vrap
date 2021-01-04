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

// TODO: remove once interchange (nginx) is setup locally
// const isProd = process.env.NODE_ENV === 'production';
// const assetPrefix = isProd ? `/fulfillment/${shortHash}` : '';
const assetPrefix = '';

const config = {
  assetPrefix,
  generateBuildId: () => shortHash,
  publicRuntimeConfig: {
    ASSET_PREFIX: assetPrefix,
    NAME: name,
    VERSION: version,
    SHORT_HASH: shortHash,
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

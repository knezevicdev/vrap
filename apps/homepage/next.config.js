/* eslint-disable @typescript-eslint/no-var-requires */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const childProcess = require('child_process');
const gitHash = childProcess
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

// TODO: remove once interchange (nginx) is setup locally
const isProd = process.env.NODE_ENV === 'production';

const config = {
  env: {
    SHORT_HASH: `${gitHash}`,
  },
  // assetPrefix: isProd ? `/hp` : '',
  assetPrefix: isProd ? `/homepage/${gitHash}` : '',
  generateBuildId: () => gitHash,
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

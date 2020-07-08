/* eslint-disable @typescript-eslint/no-var-requires */

const childProcess = require('child_process');
const shortHash = childProcess
  .execSync('git rev-parse --short=8 HEAD')
  .toString()
  .trim();

// TODO: remove once interchange (nginx) is setup locally
const isProd = process.env.NODE_ENV === 'production';
const assetPrefix = isProd ? `/product/${shortHash}` : '';

module.exports = {
  env: {
    ASSET_PREFIX: assetPrefix,
  },
  assetPrefix,
  generateBuildId: () => assetPrefix,
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

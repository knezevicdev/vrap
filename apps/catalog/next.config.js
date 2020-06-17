/* eslint-disable @typescript-eslint/no-var-requires */

const childProcess = require('child_process');
const gitHash = childProcess.execSync('git rev-parse HEAD').toString().trim();

// TODO: remove once interchange (nginx) is setup locally
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/catalog' : '',
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

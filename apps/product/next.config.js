/* eslint-disable @typescript-eslint/no-var-requires */

const childProcess = require('child_process');
const shortHash = childProcess
  .execSync('git rev-parse --short=8 HEAD')
  .toString()
  .trim();

// TODO: update to /inventory after this port is A/B tested.
const basePath = '/vehicle';

module.exports = {
  env: {
    BASE_PATH: basePath,
  },
  basePath,
  distDir: `.next/${shortHash}`,
  generateBuildId: () => shortHash,
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

/* eslint-disable @typescript-eslint/no-var-requires */

const childProcess = require('child_process');
const gitHash = childProcess.execSync('git rev-parse HEAD').toString().trim();

// TODO: remove once interchange (nginx) is setup locally
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  env: {
    SHORT_HASH: gitHash,
  },
  assetPrefix: isProd ? '/catalog' : '',
  experimental: {
    // By enabling optional catch all routes, we are able to have a single route for the catalog page.
    // This simplified things immensely because we don't have to persist state across routes.
    // https://github.com/vercel/next.js/pull/12887
    // https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes
    optionalCatchAll: true,
  },
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

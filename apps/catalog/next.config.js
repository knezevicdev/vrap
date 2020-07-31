/* eslint-disable @typescript-eslint/no-var-requires */

const { name, version } = require('./package.json');

const childProcess = require('child_process');
const shortHash = childProcess
  .execSync('git rev-parse --short=8 HEAD')
  .toString()
  .trim();

// TODO: remove once interchange (nginx) is setup locally
const isProd = process.env.NODE_ENV === 'production';
const assetPrefix = isProd ? `/cars/${shortHash}` : '';

module.exports = {
  assetPrefix,
  experimental: {
    // By enabling optional catch all routes, we are able to have a single route for the catalog page.
    // This simplified things immensely because we don't have to persist state across routes.
    // https://github.com/vercel/next.js/pull/12887
    // https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes
    optionalCatchAll: true,
  },
  generateBuildId: () => shortHash,
  publicRuntimeConfig: {
    // Will be available on both server-side and client-side
    ASSET_PREFIX: assetPrefix,
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

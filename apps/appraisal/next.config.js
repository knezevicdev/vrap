const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const childProcess = require('child_process');
const shortHash = childProcess
  .execSync('git rev-parse --short=8 HEAD')
  .toString()
  .trim();

const basePath = '/appraisal';

const config = {
  basePath,
  distDir: `.next/${shortHash}`,
  generateBuildId: () => shortHash,
  publicRuntimeConfig: {
    // Will be available on both server-side and client-side
    BASE_PATH: basePath,
    VROOM_URL: process.env.VROOM_URL,
    GEARBOX_PRIVATE_URL: process.env.GEARBOX_PRIVATE_URL,
    ACQUISITIONS_URL: process.env.ACQUISITIONS_URL,
    STATIC_ASSETS_HOST_URL: process.env.STATIC_ASSETS_HOST_URL,
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

module.exports = withBundleAnalyzer(config);

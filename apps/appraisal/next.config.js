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
    BASE_PATH: basePath,
    BRANCH_IO_KEY: process.env.NEXT_PUBLIC_BRANCH_IO_KEY,
    DATA_DOG_RUM_APPLICATION: process.env.NEXT_PUBLIC_DATA_DOG_RUM_APPLICATION,
    DATA_DOG_RUM_TOKEN: process.env.NEXT_PUBLIC_DATA_DOG_RUM_TOKEN,
    GEARBOX_PRIVATE_URL: process.env.NEXT_PUBLIC_GEARBOX_PRIVATE_URL,
    STATIC_ASSETS_HOST_URL: process.env.NEXT_PUBLIC_STATIC_ASSETS_HOST_URL,
    VROOM_URL: process.env.NEXT_PUBLIC_VROOM_URL,
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

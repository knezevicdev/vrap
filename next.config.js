/* eslint-disable @typescript-eslint/naming-convention */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const childProcess = require('child_process');
const shortHash = childProcess
  .execSync('git rev-parse --short=8 HEAD')
  .toString()
  .trim();

const basePath = '/appraisal';

const endPointSelector = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/gql';
  }
  return `${basePath}/api/gql`;
};

const config = {
  basePath,
  distDir: `.next/${shortHash}`,
  generateBuildId: () => shortHash,
  publicRuntimeConfig: {
    // Will be available on both server-side and client-side
    NEXT_PUBLIC_BASE_PATH: basePath,
    ABSMARTLY_API_KEY: process.env.ABSMARTLY_API_KEY,
    ABSMARTLY_APP: process.env.ABSMARTLY_APP,
    ABSMARTLY_ENV: process.env.ABSMARTLY_ENV,
    NEXT_PUBLIC_CAT_SERVICE_URL: process.env.NEXT_PUBLIC_CAT_SERVICE_URL,
    NEXT_PUBLIC_ABSMARTLY_URL: process.env.NEXT_PUBLIC_ABSMARTLY_URL,
    BRANCH_IO_KEY: process.env.BRANCH_IO_KEY,
    DATA_DOG_RUM_APPLICATION: process.env.DATA_DOG_RUM_APPLICATION,
    DATA_DOG_RUM_TOKEN: process.env.DATA_DOG_RUM_TOKEN,
    GEARBOX_PRIVATE_URL: process.env.GEARBOX_PRIVATE_URL,
    GEARBOX_URL: process.env.GEARBOX_URL,
    NEXT_PUBLIC_STATIC_ASSETS_HOST_URL:
      process.env.NEXT_PUBLIC_STATIC_ASSETS_HOST_URL,
    NEXT_PUBLIC_VROOM_URL: process.env.NEXT_PUBLIC_VROOM_URL,
    NEXT_PUBLIC_ACQUISITIONS_URL: process.env.NEXT_PUBLIC_ACQUISITIONS_URL,
    NEXT_PUBLIC_INTERCHANGE_URL: process.env.NEXT_PUBLIC_INTERCHANGE_URL,
    NEXT_PUBLIC_GQL_URL: process.env.NEXT_PUBLIC_GQL_URL,
    NEXT_PUBLIC_GEARBOX_REST_URL: process.env.NEXT_PUBLIC_GEARBOX_REST_URL,
    GQL_PROXY_URL: endPointSelector(),
    NEXT_PUBLIC_WEB_LEADS_URL: process.env.NEXT_PUBLIC_WEB_LEADS_URL,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    SEGMENT_WRITE_KEY: process.env.SEGMENT_WRITE_KEY,
    INTERCHANGE_PROXY_TARGET: process.env.INTERCHANGE_PROXY_TARGET,
    GQL_PROXY_TARGET: process.env.GQL_PROXY_TARGET,
    CAT_DATA_PROXY_TARGET: process.env.CAT_DATA_PROXY_TARGET,
    WEB_LEADS_PROXY_TARGET: process.env.WEB_LEADS_PROXY_TARGET,
    WEBLEAD_API: process.env.WEBLEAD_API,
  },
  /* Custom webpack configuration. */
  webpack: (config) => {
    /* Enable SVG imports. */
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });
    /* Enable graphql imports */
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    /* Enable imports relative to the project root. */
    config.resolve.modules.push(__dirname);
    return config;
  },
};

module.exports = withBundleAnalyzer(config);

/* eslint-disable @typescript-eslint/naming-convention */
const appConfig = require('./config');

const packageInfo = require('./package.json');

const childProcess = require('child_process');
const shortHash = childProcess
  .execSync('git rev-parse --short=8 HEAD')
  .toString()
  .trim();

if (!Object.keys(appConfig).includes(process.env.CURRENT_ENV))
  throw new Error('ENV variable not set properly');

const currentConfig = appConfig[process.env.CURRENT_ENV];

const basePath = process.env.NODE_ENV === 'production' ? '/appraisal' : '';

const endPointSelector = () => {
  if (process.env.NODE_ENV === 'production') {
    return '/gql';
  }
  return `/api/gql`;
};

const assetPrefixSelector = () => {
  if (process.env.NODE_ENV === 'production') {
    return basePath;
  }
  return '';
};

const config = {
  async rewrites() {
    return [
      {
        source: '/sell/vehicleInformation',
        destination: '/',
      },
      {
        source: '/sell/:slug*',
        destination: '/:slug*',
      },
      {
        source: '/appraisal',
        destination: '/',
      },
      {
        source: '/appraisal/:slug*',
        destination: '/:slug*',
      },
      {
        source: '/tradeIn-selfService',
        destination: '/',
      },
      {
        source: '/tradeIn-selfService-Review',
        destination: '/review',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/sell/vehicleInformation/:vehicle',
        destination: '/sell/vehicleInformation?vehicle=:vehicle',
        permanent: false,
      },
      {
        source: '/sell/verification/owner/:priceId',
        destination: '/sell/verification/owner?priceId=:priceId',
        permanent: false,
      },
      {
        source: '/sell/verification/documents/:priceId',
        destination: '/sell/verification/documents?priceId=:priceId',
        permanent: false,
      },
      {
        source: '/sell/verification/review/:priceId',
        destination: '/sell/verification/review?priceId=:priceId',
        permanent: false,
      },
      {
        source: '/tradeIn-selfService/:vehicle',
        destination: '/tradeIn-selfService?vehicle=:vehicle',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-app-name',
            value: 'appraisal',
          },
          {
            key: 'x-version',
            value: packageInfo.version,
          },
        ],
      },
    ];
  },
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
    ITERABLE_UNSUBSCRIBE_KEY: process.env.ITERABLE_UNSUBSCRIBE_KEY,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    FIREBASE_CONFIG: currentConfig.firebaseConfig,
    VAST_IMAGE_PROXY_URL: process.env.VAST_IMAGE_PROXY_URL,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    SEGMENT_WRITE_KEY: process.env.SEGMENT_WRITE_KEY,
    INTERCHANGE_PROXY_TARGET: process.env.INTERCHANGE_PROXY_TARGET,
    GQL_PROXY_TARGET: process.env.GQL_PROXY_TARGET,
    CAT_DATA_PROXY_TARGET: process.env.CAT_DATA_PROXY_TARGET,
    WEB_LEADS_PROXY_TARGET: process.env.WEB_LEADS_PROXY_TARGET,
    WEBLEAD_API: process.env.WEBLEAD_API,
    NEXT_PUBLIC_VROOM_URL: process.env.NEXT_PUBLIC_VROOM_URL,
    NEXT_PUBLIC_ACQUISITIONS_URL: process.env.NEXT_PUBLIC_ACQUISITIONS_URL,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    RECAPTCHA_VERIFICATION_URL: process.env.RECAPTCHA_VERIFICATION_URL,
    VIS_URL: process.env.VIS_URL,
    APPRAISAL_API_URL: process.env.APPRAISAL_API_URL,
    APPRAISAL_API_API_KEY: process.env.APPRAISAL_API_API_KEY,
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
  compiler: {
    styledComponents: true,
  },
};

const assetPrefix = assetPrefixSelector();
if (assetPrefix) config.assetPrefix = assetPrefix;

module.exports = config;

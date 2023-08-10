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

const basePath = '/appraisal';

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
    return {
      beforeFiles: [
        {
          source: `${basePath}/_next/data/:path*`,
          destination: '/_next/data/:path*',
        },
      ],
      afterFiles: [
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
      ],
    };
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
    ABSMARTLY_API_KEY: currentConfig.ABSMARTLY_API_KEY,
    ABSMARTLY_APP: currentConfig.ABSMARTLY_APP,
    ABSMARTLY_ENV: currentConfig.ABSMARTLY_ENV,
    ABSMARTLY_URL: currentConfig.ABSMARTLY_URL,
    ANALYTICS_DISABLE_PII_PERSISTENCE:
      process.env.NEXT_PUBLIC_ANALYTICS_DISABLE_PII_PERSISTENCE,
    BASE_PATH: basePath,
    BRANCH_IO_KEY: currentConfig.BRANCH_IO_KEY,
    CAT_SERVICE_URL: currentConfig.CAT_SERVICE_URL,
    DATA_DOG_RUM_APPLICATION: currentConfig.DATA_DOG_RUM_APPLICATION,
    DATA_DOG_RUM_TOKEN: currentConfig.DATA_DOG_RUM_TOKEN,
    FIREBASE_CONFIG: currentConfig.FIREBASE_CONFIG,
    GOOGLE_MAPS_API_KEY: currentConfig.GOOGLE_MAPS_API_KEY,
    GQL_PROXY_URL: endPointSelector(),
    INTERCHANGE_URL: currentConfig.INTERCHANGE_URL,
    ITERABLE_UNSUBSCRIBE_KEY: currentConfig.ITERABLE_UNSUBSCRIBE_KEY,
    RECAPTCHA_SITE_KEY: currentConfig.RECAPTCHA_SITE_KEY,
    VAST_IMAGE_PROXY_URL: currentConfig.VAST_IMAGE_PROXY_URL,
    VROOM_URL: currentConfig.VROOM_URL,
    WEB_LEADS_URL: currentConfig.WEB_LEADS_URL,
    ICO_DASH_URL: currentConfig.ICO_DASH_URL,
    ICO_DASH_AUTH: currentConfig.ICO_DASH_AUTH,
    ICO_DASH_OVERRIDE: currentConfig.ICO_DASH_OVERRIDE,
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    ACCOUNT_MANAGEMENT_URL: currentConfig.ACCOUNT_MANAGEMENT_URL,
    ACQUISITIONS_URL: currentConfig.ACQUISITIONS_URL,
    APPRAISAL_API_API_KEY: process.env.APPRAISAL_API_API_KEY,
    APPRAISAL_API_URL: currentConfig.APPRAISAL_API_URL,
    CAT_DATA_PROXY_TARGET: currentConfig.CAT_DATA_PROXY_TARGET,
    GOOGLE_MAPS_GEOCODING_API_KEY: process.env.GOOGLE_MAPS_GEOCODING_API_KEY,
    GQL_PROXY_TARGET: currentConfig.GQL_PROXY_TARGET,
    INTERCHANGE_PROXY_TARGET: currentConfig.INTERCHANGE_PROXY_TARGET,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    RECAPTCHA_VERIFICATION_URL: currentConfig.RECAPTCHA_VERIFICATION_URL,
    SEGMENT_WRITE_KEY: currentConfig.SEGMENT_WRITE_KEY,
    VIS_URL: currentConfig.VIS_URL,
    WEB_LEADS_PROXY_TARGET: currentConfig.WEB_LEADS_PROXY_TARGET,
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

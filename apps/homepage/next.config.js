module.exports = {
  /* Not all env vars must be listed here.
  Only env vars used client-side must be added.
  Env vars used only be the server are handled by docker-compose.yaml,
  or whatever deployment injection method we choose. */
  /* Custom webpack configuration. */
  webpack: config => {
    /* Enable SVG imports. */
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });
    /* Enable imports relative to the project root. */
    config.resolve.modules.push(__dirname);
    return config;
  },
  env: {
    CDN_URL: '',
    CLIENT_TAG_MANAGER_SRC_URL: `https://assets.adobedtm.com/b14636b10888/4d943c2e5a28/launch-cca5a24b442e-staging.min.js`,
    INVSEARCH_V3_URL: `https://invsearch-v3-prod-ext.aws.vroomapi.com/v3`,
    LEADS_URL: `https://leads-dev-int.vroomapi.com:8443`,
    SEGMENT_WRITE_KEY: `DwAbhfNQBWxGRV9Y4rwlNRgFgDpwDUOb`,
  },
};

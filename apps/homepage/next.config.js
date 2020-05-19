// TODO: remove once interchange (nginx) is setup locally
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/hp' : '',
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

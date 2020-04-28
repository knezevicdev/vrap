module.exports = {
  addons: ['@storybook/preset-typescript'],
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Add SVGR Loader
    // ========================================================
    const assetRule = config.module.rules.find(({ test }) => test.test('.svg'));

    const assetLoader = {
      loader: assetRule.loader,
      options: assetRule.options || assetRule.query,
    };

    // Merge our rule with existing assetLoader rules
    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader', assetLoader],
    });

    // Return the altered config
    return config;
  },
};

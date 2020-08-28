module.exports = {
  addons: ['@storybook/preset-typescript', '@storybook/addon-viewport', '@storybook/addon-docs', '@storybook/addon-docs/preset'],
  stories: ['../src/**/*.stories.tsx'],
  module: {
    rules: [
      {
        test: /\.(woff2|woff|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
};

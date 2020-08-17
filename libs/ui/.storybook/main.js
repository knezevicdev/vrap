module.exports = {
  addons: ['@storybook/preset-typescript'],
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

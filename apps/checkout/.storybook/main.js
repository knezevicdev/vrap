const path = require('path');
module.exports = {
    "stories": [
        "../src/stories/**/*.stories.mdx",
        "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    "addons": [
        {
            name: '@storybook/addon-essentials',
            options: {
                actions: false,
                backgrounds: false,
                controls: false,
                toolbars: false,
            }
        },
        "storybook-addon-designs",
        "storybook-addon-performance/register"
    ],
    webpackFinal: async (config) => {

        config.resolve.alias = {
          ...config.resolve.alias
        };

        config.module.rules.push({ 
          test: /\.graphql$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        });
    
        config.resolve.modules = [
          ...(config.resolve.modules || []),
          path.resolve(__dirname, "../"),
        ];
        return config;
      },
}


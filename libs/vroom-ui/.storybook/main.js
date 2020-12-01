module.exports = {
    "stories": [
        "../src/**/stories/*.stories.mdx",
        "../src/**/stories/*.stories.@(js|jsx|ts|tsx)",
        "../../../apps/**/src/stories/**/*.stories.mdx)",
        "../../../apps/**/src/stories/**/*.stories.@(js|jsx|ts|tsx)",
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
    ]
}


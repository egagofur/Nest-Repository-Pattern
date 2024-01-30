const path = require('path');

module.exports = {
    stories: ['../apps/backoffice/app/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            apps: path.resolve(__dirname, '../apps'),
        };
        return config;
    },
};

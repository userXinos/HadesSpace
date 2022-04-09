const { resolve } = require('path');

const configureWebpack = require('./webpack.config.js');

const isDev = (process.env.NODE_ENV === 'development');

module.exports = {
    productionSourceMap: isDev,
    css: {
        sourceMap: isDev,
    },
    configureWebpack,
    chainWebpack: (config) => {
        config.resolve.alias.set('vue', '@vue/compat');

        config.module
            .rule('vue')
            .use('vue-loader')
            .tap((options) => {
                return {
                    ...options,
                    compilerOptions: {
                        compatConfig: {
                            MODE: 2,
                        },
                    },
                };
            });
    },
};

const configureWebpack = require('./webpack.config.js');

const isDev = (process.env.NODE_ENV === 'development');

module.exports = {
    publicPath: isDev ? '/' : '/HadesSpace/',
    productionSourceMap: isDev,
    lintOnSave: isDev,
    css: {
        sourceMap: isDev,
    },
    pwa: {
        name: 'Hades Space',
        themeColor: '#161b1d',
        iconPaths: {
            favicon32: './public/favicon/favicon-32x32.png',
            favicon16: './public/favicon/favicon-16x16.png',
            appleTouchIcon: './public/favicon/apple-touch-icon.pn',
            maskIcon: './public/favicon/safari-pinned-tab.svg',
            msTileImage: './public/favicon/mstile-150x150',
        },
    },
    configureWebpack,
};

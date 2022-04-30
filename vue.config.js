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
        manifestOptions: {
            icons: [
                { 'src': 'favicon/favicon-32x32.png', 'sizes': '32x32', 'type': 'image/png' },
                { 'src': 'favicon/favicon-16x16.png', 'sizes': '16x16', 'type': 'image/png' },
                { 'src': 'favicon/favicon-512x512.png', 'sizes': '512x512', 'type': 'image/png' },
                { 'src': 'favicon/favicon-512x512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable' },
            ],
        },
        iconPaths: {
            favicon32: 'favicon/favicon-32x32.png',
            favicon16: 'favicon/favicon-16x16.png',
            appleTouchIcon: 'favicon/apple-touch-icon.png',
            maskIcon: 'favicon/safari-pinned-tab.svg',
            msTileImage: 'favicon/mstile-150x150',
            faviconSVG: null,
        },
    },
    configureWebpack,
};

/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve } = require('path');
const path = (...p) => resolve(__dirname, ...p);

module.exports = {
    resolve: {
        alias: {
            '@Data': path('parser/dist'),
            '@i18n': path('i18n/dist'),
            '@Regulation': path('src/regulation'),
            '@Img': path('src/img'),
            '@Utils': path('src/utils'),
            '@Store': path('src/store'),
            '@Handlers': path('src/utils/Handlers'),

            'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
        },
    },
    module: {
        rules: [
            {
                test: /\.md$/i,
                loader: 'raw-loader',
            },
            {
                test: /\.json$/,
                type: 'javascript/auto',
                loader: '@intlify/vue-i18n-loader',
                include: [
                    path('i18n/dist'),
                ],
            },
        ],
    },
};

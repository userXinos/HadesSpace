const { resolve } = require('path');
const path = (...p) => resolve(__dirname, ...p);

const isNebulaBuild = process.env.VUE_APP_NEBULA_BUILD;

module.exports = {
    resolve: {
        alias: {
            '@Data': isNebulaBuild ? path('parser/dist/Nebula') : path('parser/dist'),
            '@i18n': path('i18n/dist'),
            '@Regulation': path('src/regulation'),
            '@Img': isNebulaBuild ? path('src/img/Nebula') : path('src/img'),
            '@Scripts': path('src/js'),
            '@Store': path('src/store'),
            '@Handlers': path('src/js/Handlers'),
        },
    },
    module: {
        rules: [
            {
                test: /\.md$/i,
                loader: 'raw-loader',
            },
        ],
    },
};

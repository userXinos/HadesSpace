const { resolve } = require('path');
const path = (...p) => resolve(__dirname, ...p);

module.exports = {
    resolve: {
        alias: {
            '@Data': path('parser/dist'),
            '@i18n': path('i18n/dist'),
            '@Regulation': path('src/regulation'),
            '@Img': path('src/img'),
            '@Scripts': path('src/js'),
            '@Store': path('src/store/index.js'),
            '@Handlers': path('src/js/Handlers'),
        },
        extensions: ['.js'],
    },
};

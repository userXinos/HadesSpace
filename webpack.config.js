const { resolve } = require('path');
const path = (...p) => resolve(__dirname, ...p);

module.exports = {
    resolve: {
        alias: {
            '@Data': path('parser/dist/'),
            '@Regulation': path('src/regulation'),
            '@Img': path('src/img/'),
            '@Utils': path('src/js/'),
            '@Handlers': path('src/js/Handlers/'),
        },
        extensions: ['.js'],
    },
};

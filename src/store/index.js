import { createStore, createLogger } from 'vuex';

const isDev = (process.env.NODE_ENV === 'development');

import userSettingsModule from '@/store/modules/userSettings/index.js';

export default createStore({
    strict: isDev,

    modules: {
        userSettings: userSettingsModule,
    },
    plugins: [
        (isDev) ? createLogger() : null,
    ],
});

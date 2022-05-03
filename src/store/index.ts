import { createStore, createLogger } from 'vuex';

const isDev = (process.env.NODE_ENV === 'development');

import userSettingsModule from '@Store/modules/userSettings/index';

interface RootState {
    userSettings: UserSettings;
}

export default createStore<RootState>({
    strict: isDev,

    modules: {
        userSettings: userSettingsModule,
    },
    plugins: (isDev) ? [createLogger()] : [],
});

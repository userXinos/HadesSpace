import { createStore, createLogger, MutationTree, ActionTree } from 'vuex';

const isDev = (process.env.NODE_ENV === 'development');

import types from '@Store/types';
import userSettingsModule from '@Store/modules/userSettings/index';

interface RootState {
    userSettings: UserSettings;
    modals: number[]
}

const state = {
    modals: [] as RootState['modals'],
} as RootState;
const mutations = <MutationTree<RootState>> {
    [types.MODAL_OPEN](state, key) {
        state.modals.push(key);
    },
    [types.MODAL_CLOSE](state, key) {
        const i = state.modals.indexOf(key);
        if (i != -1) {
            state.modals.splice(i, 1);
        }
    },
};
const actions = <ActionTree<RootState, unknown>> {
    [types.MODAL_OPEN]({ state, commit }) {
        const key = state.modals.length + 1;
        commit(types.MODAL_OPEN, key);
        return key;
    },
    [types.MODAL_CLOSE]({ commit }, key) {
        commit(types.MODAL_CLOSE, key);
    },
};

const logger = createLogger({
    logActions: false,
});

export default createStore<RootState>({
    strict: isDev,

    state: state,
    mutations: mutations,
    actions: actions,

    modules: {
        userSettings: userSettingsModule,
    },
    // plugins: (isDev) ? [logger] : [],
});

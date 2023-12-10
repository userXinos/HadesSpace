import { createStore, MutationTree, ActionTree } from 'vuex';

const isDev = (process.env.NODE_ENV === 'development');

import types from './types';

/* userSettingsModule */
import userSettingsModule from './modules/userSettings/index';
import userSettingsPlugin from './modules/userSettings/plugin';
/* userSettingsModule */

interface RootState {
    userSettings: Settings;
    modals: number[]
    openConfirm: (str: string) => Promise<void>;
}

const state = {
    modals: [] as RootState['modals'],
    openConfirm: (() => Promise.prototype) as RootState['openConfirm'],
} as RootState;
const mutations = <MutationTree<RootState>> {
    [types.MODAL_OPEN](state, key: number) {
        state.modals.push(key);
    },
    [types.MODAL_CLOSE](state, key: number) {
        const i = state.modals.indexOf(key);
        if (i != -1) {
            state.modals.splice(i, 1);
        }
    },
    [types.REGISTER_CONFIRM](state, openFunc: RootState['openConfirm']) {
        state.openConfirm = openFunc;
    },
    [types.OPEN_CONFIRM](state, str: string) {
        return state.openConfirm(str);
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
    [types.REGISTER_CONFIRM]({ commit }, openFunc: RootState['openConfirm']) {
        commit(types.REGISTER_CONFIRM, openFunc);
    },
    [types.OPEN_CONFIRM](_, str: string) {
        return state.openConfirm(str);
    },
};

export default createStore<RootState>({
    strict: isDev,

    state: state,
    mutations: mutations,
    actions: actions,

    modules: {
        userSettings: userSettingsModule,
    },
    plugins: [userSettingsPlugin],
});

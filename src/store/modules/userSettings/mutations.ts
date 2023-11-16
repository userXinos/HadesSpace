import { MutationTree } from 'vuex';
import { setI18nLanguage } from '@Utils/Vue/i18n';

import types from './types';

export default <MutationTree<Settings>>{
    [types.SET_LANGUAGE](state, code) {
        state.language = code;
        return setI18nLanguage(code);
    },
    [types.SWITCH_DISABLE_FILTERS](state) {
        state.disableFilters = !state.disableFilters;
        return state.disableFilters;
    },
    [types.SWITCH_COMPACT_MODULES_BY_ART_TYPE_TABLE](state) {
        state.compactModulesByArtTypeTable = !state.compactModulesByArtTypeTable;
        return state.compactModulesByArtTypeTable;
    },
    [types.SWITCH_PLANETS_CALC_SP2](state) {
        state.planetsCalcSp2 = !state.planetsCalcSp2;
        return state.planetsCalcSp2;
    },
    [types.DEBUG_SWITCH_SHOW_KEYS](state) {
        state.showKeys = !state.showKeys;
        return state.showKeys;
    },
    [types.SET_LAST_CHECKED_VERSION_CHANGELOG](state, ver) {
        state.lastVersionChangelog = ver;
        return state.lastVersionChangelog;
    },
};

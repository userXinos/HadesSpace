import { ref } from 'vue';

import store from '@Store/index';
import router from '@/js/Vue/router';

import types from '@Store/modules/userSettings/types';

const { VERSION } = process.env;

export default function appChangelog() {
    const isOpen = ref(false);

    return {
        isOpen,
        init,
        onClose,
        version: VERSION,
    };


    function init() {
        if (needChangeLog()) {
            router.afterEach(() => {
                if (needChangeLog()) {
                    isOpen.value = true;
                }
            });
        }
    }
    function needChangeLog() {
        const get = (s: string) => s.split(/\./g).slice(0, -1);
        const currVers = get(VERSION);
        const lastVers = get(store.state.userSettings.lastVersionChangelog);

        if (lastVers[0] == '0') {
            store.commit(types.SET_LAST_CHECKED_VERSION_CHANGELOG, VERSION);

            return false;
        }

        while (currVers.length || lastVers.length) {
            const a = Number(currVers.shift());
            const b = Number(lastVers.shift());

            if (a === b) {
                continue;
            }
            return (a > b || isNaN(b));
        }
        return false;
    }
    function onClose() {
        store.commit(types.SET_LAST_CHECKED_VERSION_CHANGELOG, VERSION);
        isOpen.value = false;
    }
}

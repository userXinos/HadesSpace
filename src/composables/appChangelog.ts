import { ref, onMounted } from 'vue';

import store from '@Store/index';
import router from '@Utils/Vue/router';

import types from '@Store/modules/userSettings/types';

const { VERSION } = process.env;

export default function appChangelog() {
    const isOpen = ref(false);

    onMounted(() => init());

    return {
        isOpen,
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
        const current = get(VERSION);
        const last = get(store.state.userSettings.lastVersionChangelog);

        if (last[0] == '0') {
            store.commit(types.SET_LAST_CHECKED_VERSION_CHANGELOG, VERSION);

            return false;
        }

        while (current.length || last.length) {
            const a = Number(current.shift());
            const b = Number(last.shift());

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

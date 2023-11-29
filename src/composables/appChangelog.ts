import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import types from '@/store/modules/userSettings/types';

export default function appChangelog() {
    const router = useRouter();
    const store = useStore();
    const isOpen = ref(false);

    onMounted(() => init());

    return {
        isOpen,
        onClose,
        version: __APP_VERSION__,
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
        const current = get(__APP_VERSION__);
        const last = get(store.state.userSettings.lastVersionChangelog);

        if (last[0] == '0') {
            store.commit(types.SET_LAST_CHECKED_VERSION_CHANGELOG, __APP_VERSION__);

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
        store.commit(types.SET_LAST_CHECKED_VERSION_CHANGELOG, __APP_VERSION__);
        isOpen.value = false;
    }
}

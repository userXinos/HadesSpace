// noinspection JSUnusedGlobalSymbols

import VueProgressBar from '@aacassandra/vue3-progressbar';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $Progress: VueProgressBar;
    }
}

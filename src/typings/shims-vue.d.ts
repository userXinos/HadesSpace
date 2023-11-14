// noinspection JSUnusedGlobalSymbols

import { Router, RouteLocationNormalized } from 'vue-router';
import { Store } from 'vuex';
import { vTDirective } from 'vue-i18n';
import store from '@/store';

declare module '*.vue' {
    import { defineComponent } from 'vue';
    const component: ReturnType<typeof defineComponent>;
    export default component;
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<store>
        $router: Router
        $route: RouteLocationNormalized
        $t: vTDirective
    }
}


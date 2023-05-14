/* eslint-disable */
import { Router, RouteLocationNormalized } from 'vue-router';

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteLocationNormalized;
  }
}


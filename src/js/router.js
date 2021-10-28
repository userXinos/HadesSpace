import Vue from 'vue';
import Router from 'vue-router';
import {routes} from './pages';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {selector: to.hash};
    }
    return {x: 0, y: 0};
  },
});

router.onError((err) => {
  console.error(err);
  Vue.prototype.$Progress.fail();
});

export default router;

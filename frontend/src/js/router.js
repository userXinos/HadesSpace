import Vue from 'vue';
import Router from 'vue-router';
import VueMeta from 'vue-meta';

Vue.use(Router);
Vue.use(VueMeta);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "Index" */ '../pages/Index.vue'),
    },
    {
      path: '/stars',
      name: 'stars',
      component: () => import(/* webpackChunkName: "Stars" */ '../pages/Stars.vue'),
    },
    {
      path: '/planetscalc',
      name: 'PlanetsCalc',
      component: () => import(/* webpackChunkName: "PlanetsCalc" */ '../pages/PlanetsCalc.vue'),
    },
    {
      path: '/achievements',
      name: 'Achievements',
      meta: {titleKey: 'true'},
      component: () => import(/* webpackChunkName: "Achievements" */ '../pages/Achievements.vue'),
    },
    {
      path: '/alliancelevels',
      name: 'AllianceLevels',
      component: () => import(/* webpackChunkName: "AllianceLevels" */ '../pages/AllianceLevels.vue'),
    },
    {
      path: '/bluestar',
      name: 'BlueStar',
      component: () => import(/* webpackChunkName: "BlueStar" */ '../pages/BlueStar.vue'),
    },
    {
      path: '/cerberus',
      name: 'Cerberus',
      component: () => import(/* webpackChunkName: "Cerberus" */ '../pages/Cerberus.vue'),
    },
    {
      path: '/mining',
      name: 'Mining',
      component: () => import(/* webpackChunkName: "Mining" */ '../pages/Mining.vue'),
    },
    {
      path: '/playergoals',
      name: 'PlayerGoals',
      component: () => import(/* webpackChunkName: "PlayerGoals" */ '../pages/PlayerGoals.vue'),
    },
    {
      path: '/redstar',
      name: 'RedStar',
      component: () => import(/* webpackChunkName: "RedStar" */ '../pages/RedStar.vue'),
    },
    {
      path: '/shield',
      name: 'Shield',
      component: () => import(/* webpackChunkName: "Shield" */ '../pages/Shield.vue'),
    },
    {
      path: '/ships',
      name: 'Ships',
      component: () => import(/* webpackChunkName: "Ships" */ '../pages/Ships.vue'),
    },
    {
      path: '/spacebuildings',
      name: 'SpaceBuildings',
      component: () => import(/* webpackChunkName: "SpaceBuildings" */ '../pages/SpaceBuildings.vue'),
    },
    {
      path: '/support',
      name: 'Support',
      component: () => import(/* webpackChunkName: "Support" */ '../pages/Support.vue'),
    },
    {
      path: '/trade',
      name: 'Trade',
      component: () => import(/* webpackChunkName: "Trade" */ '../pages/Trade.vue'),
    },
    {
      path: '/weapon',
      name: 'Weapon',
      component: () => import(/* webpackChunkName: "Weapon" */ '../pages/Weapon.vue'),
    },
    {
      path: '/whitestar',
      name: 'WhiteStar',
      component: () => import(/* webpackChunkName: "WhiteStar" */ '../pages/WhiteStar.vue'),
    },
    {
      path: '/yellowstar',
      name: 'YellowStar',
      component: () => import(/* webpackChunkName: "YellowStar" */ '../pages/YellowStar.vue'),
    },
    // {
    //   path: '/404',
    //   name: '404',
    //   component: () => import(/* webpackChunkName: "404" */ '../pages/404.vue'),
    // },
    // {
    //   path: '*',
    //   redirect: '/404',
    // },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {selector: to.hash};
    }
    return {x: 0, y: 0};
  },
});

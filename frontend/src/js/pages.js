const data = [
  {
    name: 'index',
    link: {router: '/'},
    component: () => import(/* webpackChunkName: "Index" */ '../pages/Index.vue'),
  },
  {
    name: '404',
    link: {router: '/404'},
    component: () => import(/* webpackChunkName: "404" */ '../pages/404.vue'),
  },
  {
    text: {locKey: 'TID_SHIP_UPGRADE_DLG_TITLE'},
    childrens: [
      {
        name: 'Trade',
        text: {locKey: 'typeModTrade'},
        link: {router: '/trade'},
        component: () => import(/* webpackChunkName: "Trade" */ '../pages/Trade.vue'),
        icon: {
          bgClass: 'module-bg',
          img: require('../img/Modules/Mod_TransportAutopilot_Icon.png'),
        },
      },
      {
        name: 'Mining',
        text: {locKey: 'typeModMining'},
        link: {router: '/mining'},
        component: () => import(/* webpackChunkName: "Mining" */ '../pages/Mining.vue'),
        icon: {
          bgClass: 'module-bg',
          img: require('../img/Modules/Mod_MiningBoost_Icon.png'),
        },
      },
      {
        name: 'Weapon',
        text: {locKey: 'typeModWeapon'},
        link: {router: '/weapon'},
        component: () => import(/* webpackChunkName: "Weapon" */ '../pages/Weapon.vue'),
        icon: {
          bgClass: 'module-bg',
          img: require('../img/Modules/Mod_Barrage_Icon.png'),
        },
      },
      {
        name: 'Shield',
        text: {locKey: 'typeModShield'},
        link: {router: '/shield'},
        component: () => import(/* webpackChunkName: "Shield" */ '../pages/Shield.vue'),
        icon: {
          bgClass: 'module-bg',
          img: require('../img/Modules/Mod_PassiveShield_Icon.png'),
        },
      },
      {
        name: 'Support',
        text: {locKey: 'typeModSupport'},
        link: {router: '/support'},
        component: () => import(/* webpackChunkName: "Support" */ '../pages/Support.vue'),
        icon: {
          bgClass: 'module-bg',
          img: require('../img/Modules/Mod_Destiny_Icon.png'),
        },
      },
    ],
  },
  {
    text: {locKey: 'sections'},
    childrens: [
      {
        text: {locKey: 'planets'},
        link: {router: '/yellowstar#Planets'},
        icon: {
          img: require('../img/icons/planet.png'),
        },
      },
      {
        name: 'Ships',
        text: {locKey: 'TID_PRODUCTION_DLG_SHIPS'},
        link: {router: '/ships'},
        component: () => import(/* webpackChunkName: "Ships" */ '../pages/Ships.vue'),
        icon: {
          img: require('../img/Ships/Miner_lv6.png'),
          isNotIcon: true,
          classes: ['ships'],
        },
      },
      {
        name: 'Cerberus',
        text: {locKey: 'cerberus'},
        link: {router: '/cerberus'},
        component: () => import(/* webpackChunkName: "Cerberus" */ '../pages/Cerberus.vue'),
        icon: {
          img: require('../img/Ships/Fighter_Cerberus6_lv1.png'),
          isNotIcon: true,
          classes: ['ships', 'cerberus'],
        },
      },
      {
        name: 'Stars',
        text: {locKey: 'stars'},
        link: {router: '/stars'},
        component: () => import(/* webpackChunkName: "Stars" */ '../pages/Stars.vue'),
        icon: {
          img: require('../img/Stars/star_red.png'),
        },
        childrens: [
          {
            name: 'YellowStar',
            text: {locKey: 'TID_YELLOW_STAR'},
            link: {router: '/yellowstar'},
            component: () => import(/* webpackChunkName: "YellowStar" */ '../pages/YellowStar.vue'),
            icon: {
              img: require('../img/Stars/star_yellow.png'),
            },
          },
          {
            name: 'RedStar',
            text: {locKey: 'TID_RED_STAR'},
            link: {router: '/redstar'},
            component: () => import(/* webpackChunkName: "RedStar" */ '../pages/RedStar.vue'),
            icon: {
              img: require('../img/Stars/star_red.png'),
            },
          },
          {
            name: 'WhiteStar',
            text: {locKey: 'TID_WHITE_STAR'},
            link: {router: '/whitestar'},
            component: () => import(/* webpackChunkName: "WhiteStar" */ '../pages/WhiteStar.vue'),
            icon: {
              img: require('../img/Stars/star_white.png'),
            },
          },
          {
            name: 'BlueStar',
            text: {locKey: 'TID_BLUE_STAR'},
            link: {router: '/bluestar'},
            component: () => import(/* webpackChunkName: "BlueStar" */ '../pages/BlueStar.vue'),
            icon: {
              img: require('../img/Stars/star_blue.png'),
            },
          },
        ],
      },
      {
        name: 'SpaceBuildings',
        text: {locKey: 'TID_PRODUCTION_DLG_STATIONS'},
        link: {router: '/spacebuildings'},
        component: () => import(/* webpackChunkName: "SpaceBuildings" */ '../pages/SpaceBuildings.vue'),
        icon: {
          bgClass: 'spaceBuildings-bg',
          img: require('../img/SpaceBuildings/shipyard.png'),
        },
      },
      {
        text: {locKey: 'TID_OBJECT_ACTION_ARTIFACTS'},
        link: {router: '/redstar#Artifacts'},
        icon: {
          bgClass: 'art-bg',
          img: require('../img/icons/art.png'),
        },
      },
      {
        name: 'AllianceLevels',
        text: {locKey: 'TID_CORP_LEVELS_LABEL'},
        link: {router: '/alliancelevels'},
        component: () => import(/* webpackChunkName: "AllianceLevels" */ '../pages/AllianceLevels.vue'),
        icon: {
          img: () => null,
        },
      },
      {
        name: 'PlayerGoals',
        text: {locKey: 'TID_EMPIRE_OBJECTIVES'},
        link: {router: '/playergoals'},
        component: () => import(/* webpackChunkName: "PlayerGoals" */ '../pages/PlayerGoals.vue'),
        icon: {
          img: () => null,
        },
      },
      {
        name: 'Achievements',
        text: {locKey: 'TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS'},
        link: {router: '/achievements'},
        component: () => import(/* webpackChunkName: "Achievements" */ '../pages/Achievements.vue'),
        icon: {
          img: () => null,
        },
      },
    ],
  },
  {
    text: {locKey: 'other'},
    childrens: [
      {
        name: 'PlanetsCalc',
        text: {locKey: 'planetscalc'},
        link: {router: '/planetscalc'},
        component: () => import(/* webpackChunkName: "PlanetsCalc" */ '../pages/PlanetsCalc.vue'),
        icon: {
          img: require('../img/icons/calc.png'),
        },
      },
      {
        text: {
          locKey: 'switchAccs',
          after: '(by Raerten)',
        },
        link: 'https://github.com/Raerten/HSAccs',
        icon: {
          img: require('../img/icons/github_logo.png'),
        },
      },
    ],
  },
];

export const routes = getRoutes(data);
export const pages = getPages(data);

function getRoutes(data) {
  const result = runner(data);
  result.push({ // универсальная страница для 404
    path: '/*',
    redirect: '/404',
  });
  return result;

  function runner(arr) {
    let result = [];
    arr.forEach((item) => {
      if ('component' in item) {
        result.push({
          name: item.name,
          path: item.link.router,
          component: item.component,
        });
      }
      if ('childrens' in item) {
        result = result.concat(runner(item.childrens));
      }
    });
    return result;
  }
}
function getPages(data) {
  const result = [];

  data.forEach((item) => {
    if ('text' in item) {
      const resultItem = {};

      resultItem.text = item.text;
      if ('childrens' in item) {
        if (!Array.isArray(resultItem.childrens)) resultItem.childrens = [];
        resultItem.childrens = resultItem.childrens.concat(getPages(item.childrens));
      }
      if ('link' in item) {
        resultItem.link = item.link;
        resultItem.icon = item.icon;
      }

      result.push(resultItem);
    }
  });
  return result;
}


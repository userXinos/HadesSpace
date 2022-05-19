export default [
    {
        name: 'Index',
        path: '/',
        component: () => import(/* webpackChunkName: "Index" */ '../pages/Index.vue'),
    },
    {
        text: { locKey: 'TID_SHIP_UPGRADE_DLG_TITLE' },
        children: [
            {
                name: 'Trade',
                text: { locKey: 'TYPE_MOD_TRADE' },
                path: '/trade',
                component: () => import(/* webpackChunkName: "Trade" */ '../pages/Trade.vue'),
                icon: {
                    name: 'Mod_TransportAutopilot_Icon',
                    dir: 'game/Modules',
                },
            },
            {
                name: 'Mining',
                text: { locKey: 'TYPE_MOD_MINING' },
                path: '/mining',
                component: () => import(/* webpackChunkName: "Mining" */ '../pages/Mining.vue'),
                icon: {
                    name: 'Mod_MiningBoost_Icon',
                    dir: 'game/Modules',
                },
            },
            {
                name: 'Weapon',
                text: { locKey: 'TYPE_MOD_WEAPON' },
                path: '/weapon',
                component: () => import(/* webpackChunkName: "Weapon" */ '../pages/Weapon.vue'),
                icon: {
                    name: 'Mod_Barrage_Icon',
                    dir: 'game/Modules',
                },
            },
            {
                name: 'Shield',
                text: { locKey: 'TYPE_MOD_SHIELD' },
                path: '/shield',
                component: () => import(/* webpackChunkName: "Shield" */ '../pages/Shield.vue'),
                icon: {
                    name: 'Mod_PassiveShield_Icon',
                    dir: 'game/Modules',
                },
            },
            {
                name: 'Support',
                text: { locKey: 'TYPE_MOD_SUPPORT' },
                path: '/support',
                component: () => import(/* webpackChunkName: "Support" */ '../pages/Support.vue'),
                icon: {
                    name: 'Mod_Destiny_Icon',
                    dir: 'game/Modules',
                },
            },
        ],
    },
    {
        text: { locKey: 'SECTIONS' },
        children: [
            {
                name: 'Planets',
                text: { locKey: 'PLANETS' },
                path: '/yellowstar#Planets',
                icon: {
                    name: 'planet',
                    dir: 'icons',
                },
            },
            {
                name: 'Ships',
                text: { locKey: 'TID_PRODUCTION_DLG_SHIPS' },
                path: '/ships',
                component: () => import(/* webpackChunkName: "Ships" */ '../pages/Ships.vue'),
                icon: {
                    name: 'Miner_lv6',
                    dir: 'game/Ships',
                },
            },
            {
                name: 'Cerberus',
                text: { locKey: 'CERBERUS' },
                path: '/cerberus',
                component: () => import(/* webpackChunkName: "Cerberus" */ '../pages/Cerberus.vue'),
                icon: {
                    name: 'Fighter_Cerberus6_lv1',
                    dir: 'game/Ships',
                },
            },
            {
                name: 'SpaceBuildings',
                text: { locKey: 'TID_PRODUCTION_DLG_STATIONS' },
                path: '/spacebuildings',
                component: () => import(/* webpackChunkName: "SpaceBuildings" */ '../pages/SpaceBuildings.vue'),
                icon: {
                    name: 'shipyard',
                    dir: 'game/SpaceBuildings',
                },
            },
            {
                text: { locKey: 'TID_OBJECT_ACTION_ARTIFACTS' },
                path: '/redstar#Artifacts',
                icon: {
                    name: 'art',
                    dir: 'icons',
                    bg: '',
                },
            },
            {
                name: 'AllianceLevels',
                text: { locKey: 'TID_CORP_LEVELS_LABEL' },
                path: '/alliancelevels',
                component: () => import(/* webpackChunkName: "AllianceLevels" */ '../pages/AllianceLevels.vue'),
                icon: {
                    name: 'relic',
                    dir: 'icons',
                },
            },
            {
                name: 'PlayerGoals',
                text: { locKey: 'TID_EMPIRE_OBJECTIVES' },
                path: '/playergoals',
                component: () => import(/* webpackChunkName: "PlayerGoals" */ '../pages/PlayerGoals.vue'),
                icon: {
                    name: 'influence',
                    dir: 'icons',
                },
            },
            {
                name: 'Achievements',
                text: { locKey: 'TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS' },
                path: '/achievements',
                component: () => import(/* webpackChunkName: "Achievements" */ '../pages/Achievements.vue'),
                icon: {
                    name: 'Leaderboards',
                    dir: 'icons',
                },
            },
            {
                name: 'Distinctions',
                text: { locKey: 'TID_PLAYER_INFO_SECTION_BADGES' },
                path: '/distinctions',
                component: () => import(/* webpackChunkName: "Achievements" */ '../pages/Distinctions.vue'),
                icon: {
                    name: 'Distinction_Emperor',
                    dir: 'game/Distinctions',
                },
            },
        ],
    },
    {
        text: { locKey: 'STARS' },
        children: [
            {
                name: 'YellowStar',
                text: { locKey: 'TID_YELLOW_STAR' },
                path: '/yellowstar',
                component: () => import(/* webpackChunkName: "YellowStar" */ '../pages/YellowStar.vue'),
                icon: {
                    name: 'star_yellow',
                    dir: 'game/Stars',
                },
            },
            {
                name: 'RedStar',
                text: { locKey: 'TID_RED_STAR' },
                path: '/redstar',
                component: () => import(/* webpackChunkName: "RedStar" */ '../pages/RedStar.vue'),
                icon: {
                    name: 'star_red',
                    dir: 'game/Stars',
                },
            },
            {
                name: 'WhiteStar',
                text: { locKey: 'TID_WHITE_STAR' },
                path: '/whitestar',
                component: () => import(/* webpackChunkName: "WhiteStar" */ '../pages/WhiteStar.vue'),
                icon: {
                    name: 'star_white',
                    dir: 'game/Stars',
                },
            },
            {
                name: 'BlueStar',
                text: { locKey: 'TID_BLUE_STAR' },
                path: '/bluestar',
                component: () => import(/* webpackChunkName: "BlueStar" */ '../pages/BlueStar.vue'),
                icon: {
                    name: 'star_blue',
                    dir: 'game/Stars',
                },
            },
        ],
    },
    {
        text: { locKey: 'OTHER' },
        children: [
            {
                name: 'PlanetsCalc',
                text: { locKey: 'PLANETS_CALC' },
                path: '/planetscalc',
                component: () => import(/* webpackChunkName: "PlanetsCalc" */ '../pages/PlanetsCalc.vue'),
                icon: {
                    name: 'planets-calc',
                    dir: 'icons',
                },
            },
            {
                name: 'ModulesCalc',
                text: { locKey: 'MODULES_CALC' },
                path: '/modulescalc',
                component: () => import(/* webpackChunkName: "ModulesCalc" */ '../pages/ModulesCalc.vue'),
                icon: {
                    name: 'modules-calc',
                    dir: 'icons',
                },
            },
            {
                text: {
                    locKey: 'SWITCH_ACCS',
                    params: ['by Raerten', 'up to Android 10'],
                },
                path: { externalLink: 'https://github.com/Raerten/HSAccs' },
                icon: {
                    name: 'github_logo',
                    dir: 'icons',
                },
            },
            {
                name: 'About',
                text: { locKey: 'ABOUT' },
                path: '/about',
                component: () => import(/* webpackChunkName: "About" */ '../pages/About.vue'),
                icon: {
                    name: 'info',
                    dir: 'icons',
                },
            },
        ],
    },
];


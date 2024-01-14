export default [
    {
        text: { locKey: 'TID_TECH_DLG_TITLE' },
        children: [
            {
                name: 'Trade',
                text: { locKey: 'TID_MODULE_BLUEPRINTS_LIST_CATEGORY_TRADE' },
                path: '/trade',
                component: () => import('../pages/Trade.vue'),
                icon: {
                    name: 'Mod_Category_Trade',
                    dir: 'game/Modules',
                },
            },
            {
                name: 'Mining',
                text: { locKey: 'TID_MODULE_BLUEPRINTS_LIST_CATEGORY_MINING' },
                path: '/mining',
                component: () => import('../pages/Mining.vue'),
                icon: {
                    name: 'Mod_Category_Mining',
                    dir: 'game/Modules',
                },
            },
            {
                name: 'Weapon',
                text: { locKey: 'TID_MODULE_BLUEPRINTS_LIST_CATEGORY_WEAPONS' },
                path: '/weapon',
                component: () => import('../pages/Weapon.vue'),
                icon: {
                    name: 'Mod_Category_Weapon',
                    dir: 'game/Modules',
                },
            },
            {
                name: 'Shield',
                text: { locKey: 'TID_MODULE_BLUEPRINTS_LIST_CATEGORY_SHIELDS' },
                path: '/shield',
                component: () => import('../pages/Shield.vue'),
                icon: {
                    name: 'Mod_Category_Shield',
                    dir: 'game/Modules',
                },
            },
            {
                name: 'Support',
                text: { locKey: 'TID_MODULE_BLUEPRINTS_LIST_CATEGORY_SUPPORT' },
                path: '/support',
                component: () => import('../pages/Support.vue'),
                icon: {
                    name: 'Mod_Category_Support',
                    dir: 'game/Modules',
                },
            },
            {
                name: 'Drone',
                text: { locKey: 'TID_MODULE_BLUEPRINTS_LIST_CATEGORY_DRONE' },
                path: '/drone',
                component: () => import('../pages/Drone.vue'),
                icon: {
                    name: 'Mod_Category_Drone',
                    dir: 'game/Modules',
                },
            },
            {
                text: { locKey: 'TID_CORP_FLAGSHIP' },
                path: '/ships#FlagshipModules',
                icon: {
                    name: 'Mod_Category_Flagship',
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
                path: '/yellowstar#planet_levels',
                icon: {
                    name: 'planet',
                    dir: 'icons',
                },
            },
            {
                name: 'Ships',
                text: { locKey: 'TID_PRODUCTION_DLG_SHIPS' },
                path: '/ships',
                component: () => import('../pages/Ships.vue'),
                icon: {
                    name: 'Transport_DrkNeb_lv5',
                    dir: 'game/Ships',
                },
            },
            {
                name: 'Cerberus',
                text: { locKey: 'CERBERUS' },
                path: '/cerberus',
                component: () => import('../pages/Cerberus.vue'),
                icon: {
                    name: 'Fighter_Cerberus3_DrkNeb_lv1',
                    dir: 'game/Ships',
                },
            },
            {
                name: 'SpaceBuildings',
                text: { locKey: 'TID_PRODUCTION_DLG_STATIONS' },
                path: '/spacebuildings',
                component: () => import('../pages/SpaceBuildings.vue'),
                icon: {
                    name: 'station_trade',
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
                component: () => import('../pages/AllianceLevels.vue'),
                icon: {
                    name: 'corpXp',
                    dir: 'icons',
                },
            },
            {
                name: 'Achievements',
                text: { locKey: 'TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS' },
                path: '/achievements',
                component: () => import('../pages/Achievements.vue'),
                icon: {
                    name: 'Leaderboards',
                    dir: 'icons',
                },
            },
            {
                name: 'Distinctions',
                text: { locKey: 'TID_PLAYER_INFO_SECTION_BADGES' },
                path: '/distinctions',
                component: () => import('../pages/Distinctions.vue'),
                icon: {
                    name: 'Distinction_Emperor',
                    dir: 'game/Distinctions',
                },
            },
        ],
    },
    {
        text: { locKey: 'HS_COMPENDIUM' },
        children: [
            {
                name: 'CompendiumTech',
                text: { locKey: 'TECHNOLOGIES' },
                path: '/compendiumTech',
                component: () => import('../pages/CompendiumTech.vue'),
                icon: {
                    name: 'compendiumTech',
                    dir: 'icons/compendium',
                },
            },
            {
                name: 'CompendiumCorp',
                text: { locKey: 'TID_CHAT_TAB_CORPORATION' },
                path: '/compendiumCorp',
                component: () => import('../pages/CompendiumCorp.vue'),
                icon: {
                    name: 'CompendiumCorp',
                    dir: 'icons/compendium',
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
                component: () => import('../pages/YellowStar.vue'),
                icon: {
                    name: 'star_yellow',
                    dir: 'game/Stars',
                },
            },
            {
                name: 'RedStar',
                text: { locKey: 'TID_RED_STAR' },
                path: '/redstar',
                component: () => import('../pages/RedStar.vue'),
                icon: {
                    name: 'star_red',
                    dir: 'game/Stars',
                },
            },
            {
                name: 'WhiteStar',
                text: { locKey: 'TID_WHITE_STAR' },
                path: '/whitestar',
                component: () => import('../pages/WhiteStar.vue'),
                icon: {
                    name: 'star_white',
                    dir: 'game/Stars',
                },
            },
            {
                name: 'BlueStar',
                text: { locKey: 'TID_BLUE_STAR' },
                path: '/bluestar',
                component: () => import('../pages/BlueStar.vue'),
                icon: {
                    name: 'star_blue_2',
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
                path: '/planetsCalc',
                component: () => import('../pages/PlanetsCalc.vue'),
                icon: {
                    name: 'planets-calc',
                    dir: 'icons',
                },
            },
            {
                name: 'ModulesCalc',
                text: { locKey: 'MODULES_CALC' },
                path: '/modulesCalc',
                component: () => import('../pages/ModulesCalc.vue'),
                icon: {
                    name: 'modules-calc',
                    dir: 'icons',
                },
            },
            {
                name: 'CrystalCalc',
                text: { locKey: 'CRYSTAL_CALCULATOR' },
                path: '/crystalCalc',
                component: () => import('../pages/CrystalCalc.vue'),
                icon: {
                    name: 'crystal-calc',
                    dir: 'icons',
                },
            },
            {
                name: 'ShipBuild',
                text: { locKey: 'SHIP_BUILD' },
                path: '/shipBuild',
                component: () => import('../pages/ShipBuild.vue'),
                icon: {
                    name: 'ship-build',
                    dir: 'icons',
                },
            },
            {
                name: 'WSMatches',
                text: { locKey: 'WSMatches' },
                path: '/WSMatches',
                component: () => import('../pages/WSMatches.vue'),
                icon: {
                    name: '',
                    dir: 'icons',
                },
            },
            {
                name: 'ThirdPartyTools',
                text: { locKey: 'THIRD_PARTY_TOOLS' },
                path: '/thirdPartyTools',
                component: () => import('../pages/ThirdPartyTools.vue'),
                icon: {
                    name: 'github_logo',
                    dir: 'icons',
                },
            },
            {
                name: 'About',
                text: { locKey: 'ABOUT' },
                path: '/about',
                component: () => import('../pages/About.vue'),
                icon: {
                    name: 'info',
                    dir: 'icons',
                },
            },
        ],
    },
];

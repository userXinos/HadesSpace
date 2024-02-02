import { PROVIDERS } from '@/pages/ShipBuild.vue';
declare interface Settings {
    language: string
    disableFilters: boolean,
    compactModulesByArtTypeTable: boolean,
    planetsCalcSp2: boolean,
    showKeys: boolean,
    lastVersionChangelog: string,
    compendiumCorpLastRoleId: string
    compendiumTechSyncConfigIndex: number | undefined
    calcDayCreditLimit: number
    shipBuildSync: {
        provider: PROVIDERS,
        index?: number
    }
}

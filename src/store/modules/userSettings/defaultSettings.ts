import langData from "@i18n/index.json";
function extractLangs(data: any): string[]{
    return Object.values(data).map((locale: any) => locale.Code);
};
const langList = extractLangs(langData);
if(navigator.language === 'zh-CN')
    {
        var lan = 'zh-si'
    }else{
        var lan = navigator.language
    };
if(langList.includes(lan)){}else{
    var lan = 'en'
};
export default Object.freeze(<Settings>{
    language: lan,
    disableFilters: false,
    compactModulesByArtTypeTable: true,
    planetsCalcSp2: false,
    showKeys: false,
    lastVersionChangelog: '0.0.0',
    compendiumCorpLastRoleId: '',
    compendiumTechSyncConfigIndex: undefined,
    calcDayCreditLimit: 8000000,
    shipBuildSync: { provider: null },
});

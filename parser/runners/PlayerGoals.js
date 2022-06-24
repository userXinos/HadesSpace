import Runner from '../modules/Runner.js';
import { removeDupsFromArrays } from '../modules/csv2json.js';

export default class PlayerGoals extends Runner {
    static config = {
        file: 'player_goals',
    };

    prettierConfig = {
        printWidth: 230,
    };

    run(rawData) {
        let WinBSWithModule = {};

        for (const [ key, value ] of Object.entries(rawData)) {
            if (value.GoalType === 'WinBSWithModule') {
                WinBSWithModule[key] = value;
                delete rawData[key];
            } else {
                Runner.combineMinMax(value);
            }
            if (Array.isArray(value.CRRewardPerDay)) {
                rawData[key] = Runner.fillSpace(value, null, value.CRRewardPerDay.length, true);
            }
        }


        WinBSWithModule = removeDupsFromArrays(Runner.compileOne(WinBSWithModule));
        rawData.SalvageArtifacts.StringParam.forEach((e, i, arr) => arr[i] = e[0]);
        rawData.WinBSWithModule = Runner.fillSpace(WinBSWithModule, null, WinBSWithModule.Name.length, true);
        rawData.WinBSWithModule.Name.forEach((e, i, arr) => arr[i] = e.replace(/^WinBSWith(.+?)\d?$/, '$1'));
        //                                                                         WinBSWithMODULE_NAME1
        return rawData;
    }
}

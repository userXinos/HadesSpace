import Runner from '../modules/Runner.js';
import { removeDupsFromArrays } from '../modules/csv2json.js';

export default class PlayerGoals extends Runner {
    static config = {
        file: 'player_goals',
    }

    prettierConfig = {
        printWidth: 230,
    }

    run(rawData) {
        let WinBSWithModule = {};

        Object.entries(rawData).forEach(([ key, value ]) => {
            if (value.GoalType === 'WinBSWithModule') {
                WinBSWithModule[key] = value;
                delete rawData[key];
            }
            if (Array.isArray(value.CRRewardPerDay)) {
                rawData[key] = Runner.fillSpace(value, null, value.CRRewardPerDay.length, true);
            }
        });

        WinBSWithModule = removeDupsFromArrays(Runner.compileOne(WinBSWithModule));
        rawData.WinBSWithModule = Runner.fillSpace(WinBSWithModule, null, WinBSWithModule.Name.length, true);
        return rawData;
    }
}

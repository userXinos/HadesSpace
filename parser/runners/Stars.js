import Runner from '../modules/Runner.js';
import Globals from './Globals.js';

const CONFIG = Object.freeze({
    globalKeys: {
        RedStar: 'RS',
        WhiteStar: 'WS',
        BlueStar: 'BlueStar_',
    },
    thresholdsKeys: [ 'Score1Thresholds', 'Score2Thresholds', 'Score3Thresholds' ],
});

export default class Stars extends Runner {
    static config = {
        file: 'stars',
        runner: CONFIG,
        ignoreFiles: [ 'solar_system_gen_data' ],
    }

    run(rawData) {
        const SSGD = Runner.readCsv( 'solar_system_gen_data' );
        const data = Object.fromEntries(
            Object.entries(Runner.combineObjects(rawData, SSGD)).map(([ key, value ]) => {
                if (key in CONFIG.globalKeys) {
                    value = Runner.combineObjects(value, Globals.getGlobalsBy(CONFIG.globalKeys[key]));
                }
                if (key === 'WhiteStar') {
                    const matrix = CONFIG.thresholdsKeys.map((e) => value[e]);
                    value.Thresholds = Runner.transposeMatrix(matrix);
                    CONFIG.thresholdsKeys.forEach((e) => delete value[e]);
                }
                if (key === 'RedStar') {
                    value = Runner.fillSpace(value, null, value.Models.length);
                }

                // столкнуть массивы диапазонов
                const oKeys = Object.keys(value);
                oKeys.forEach((MinKey) => {
                    if (MinKey.endsWith('Min') || MinKey.startsWith('Min')) {
                        const newKey = MinKey.match(/(Min)?(.+?)_?(Min)?$/)[2]; // eslint-disable-line prefer-destructuring
                        const MaxKey = oKeys.find((e) => e !== MinKey && new RegExp(`(Max)?${newKey}_?(Max)?`).test(e));
                        if (MaxKey) {
                            const arr = [];
                            for (let i = 0; i < value[MinKey].length; i++) {
                                arr.push([ value[MinKey][i], value[MaxKey][i] ]);
                            }
                            value[newKey] = arr;
                            delete value[MinKey];
                            delete value[MaxKey];
                        }
                    }
                });
                return [ key, value ];
            }),
        );

        data.YellowStar = Runner.combineObjects(data.Home, data.YellowStar);
        delete data.Home;

        return data;
    }
}

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
    };

    run(rawData) {
        const SSGData = this.readCsv( 'solar_system_gen_data' );
        const data = Runner.objectArrayify(Runner.combineObjects(rawData, SSGData), {
            map: ([ key, value ]) => {
                if (key in CONFIG.globalKeys) {
                    value = Runner.combineObjects(value, Globals.getGlobalsBy(CONFIG.globalKeys[key]));
                }
                if (key === 'WhiteStar') {
                    const matrix = CONFIG.thresholdsKeys.map((e) => value[e]);
                    value.Thresholds = Runner.transposeMatrix(matrix);
                    CONFIG.thresholdsKeys.forEach((e) => delete value[e]);

                    [
                        'ExtraAsteroidSpawnTick',
                        'ExtraAsteroidSpawnRingDistance',
                        'ExtraAsteroidSpawnAmt',
                    ].forEach((k) => value[k][2] = value[k][1]);
                }
                if (key === 'RedStar') {
                    value = Runner.fillSpace(value, null, value.Models?.length || value.AppearanceModels.length);
                }

                Runner.combineMinMax(value);
                return [ key, value ];
            },
        });

        data.YellowStar = Runner.combineObjects(data.Home, data.YellowStar);
        delete data.Home;

        return data;
    }
}

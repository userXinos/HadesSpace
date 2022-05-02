import Runner from '../modules/Runner.js';
import { removeDupsFromArrays } from '../modules/csv2json.js';

const CONFIG = Object.freeze({
    types: [ 'Tut', 'Combat', 'Utility', 'Support' ],
});

export default class Artifacts extends Runner {
    prettierConfig = {
        printWidth: 120,
    };

    static config = {
        file: 'artifacts',
        runner: CONFIG,
    };

    run(rawData) {
        const result = {};

        CONFIG.types.forEach((type) => {
            const Name = type;
            const BPName = `${Name}Blueprints`;

            const obj = Runner.objectArrayify(rawData, {
                filter: ([ k ]) => k.startsWith(type),
            });

            const one = Runner.compileOne(obj);
            one.Name = Name;

            result[Name] = removeDupsFromArrays(one);
            result[BPName] = { Name: BPName, ...genBPData(one) };

            [ 'BlueprintsMin', 'BlueprintsMax' ].forEach((e) => delete result[Name][e]);
            Runner.combineMinMax(result[Name]);
        });

        return result;


        function genBPData(src) {
            const minArr = src['BlueprintsMin'];
            const maxArr = src['BlueprintsMax'];
            const res = {};
            let maxIndex = 0;

            for (let i = 0; i < minArr.length; i++) {
                const lvl = i + ((src.Name === 'Support') ? 2 : 1);
                const arr = [];

                if (Array.isArray(minArr[i])) {
                    for (let j = 0; j < minArr[i].length; j++) {
                        arr.push([ minArr[i][j], maxArr[i][j] ]);
                    }
                } else {
                    arr.push([ minArr[i], maxArr[i] ]);
                }

                res[lvl] = arr;
                maxIndex = i;
            }

            return Runner.fillSpace(res, [], maxIndex + 1, true);
        }
    }
}

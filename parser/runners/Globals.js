import Runner from '../modules/Runner.js';

export default class Globals extends Runner {
    static config = {
        file: 'globals',
    };

    prettierConfig = {
        printWidth: 1000,
    };

    run(rawData) {
        return Runner.objectArrayify(rawData, {
            map: ([ key, { Value } ]) => [ key, Value ],
        });
    }

    static getGlobalsBy(str, readCsv) {
        const data = readCsv(Globals.config.file);
        return Runner.objectArrayify(data, {
            filter: ([ key ]) => key.includes(str),
            map: ([ key, { Value } ]) => [ key, Value ],
        });
    }
}

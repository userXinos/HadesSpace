import Runner from '../modules/Runner.js';

export default class Globals extends Runner {
    static config = {
        file: 'globals',
    }

    prettierConfig = {
        printWidth: 1000,
    }

    run(rawData) {
        return Object.fromEntries(
            Object.entries(rawData)
                .map(([ key, { Value } ]) => [ key, Value ]),
        );
    }

    static getGlobalsBy(str) {
        const data = Runner.readCsv(Globals.config.file);
        return Object.fromEntries(
            Object.entries(data)
                .filter(([ key, { Value } ]) => key.includes(str))
                .map(([ key, { Value } ]) => [ key, Value ]),
        );
    }
}

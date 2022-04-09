import { basename } from 'path';
import Runner from '../modules/Runner.js';

const CONFIG = Object.freeze({
    cerbGroups: {
        keys: [ 'CerbGroup_Low', 'CerbGroup_Mid', 'CerbGroup_High' ],
        numVariations: 3,
    },
    customCompileOne: {
        zeroSymbol: [ 'NumBases', 'NumMoons', 'BSAnomaly', 'TutorialUse' ],
    },
});

export default class StarSectors extends Runner {
    constructor(args) {
        super(args);
        const bigWidth = [ 'yellow_star_sectors', 'red_star_sectors' ];

        this.prettierConfig = {
            printWidth: (bigWidth.includes(basename(this.metadata.originalFile, '.csv'))) ? 1200 : 120,
        };
    }

    static config = {
        file: /\w+_star_sectors/,
        ignoreFiles: [ 'cerb_groups' ],
        runner: CONFIG,
    }

    run(rawData) {
        const [ cerbGroups, cerberusStations ] = Runner.multiReadCsv([ 'cerb_groups', 'cerberus_stations' ]);

        return customCompileOne(
            Object.fromEntries(
                Object.entries(rawData).map(([ _, value ]) => {
                    if (value.BaseType) {
                        value.BaseType = cerberusStations[value.BaseType] || null;
                    }
                    if (value.CerbGroup) {
                        value.CerbGroup = cerbGroups[value.CerbGroup] || null;
                    }
                    CONFIG.cerbGroups.keys.forEach((k) => {
                        if (value[k]) {
                            if (cerbGroups[value[k]]) {
                                value[k] = cerbGroups[value[k]];
                            } else {
                                value[k] = Array.from({ length: CONFIG.cerbGroups.numVariations },
                                    (_, i) => (
                                        cerbGroups[`${value[k]}_${i + 1}`] || cerbGroups[`${value[k]}${i + 1}`]
                                    ),
                                );
                            }
                        }
                    });
                    return [ _, value ];
                }),
            ),
        );
    }
}

/**
 * Улучшенная версия Runner.compileOne способная правильно обработать недостающие ключи/значения
 * @param {Object.<String, Object>} obj
 * @return {Object}
 */
function customCompileOne(obj) {
    const res = {};
    const getSymbol = (k) => (CONFIG.customCompileOne.zeroSymbol.includes(k)) ? 0 : null;

    Object.values(obj).forEach((e, index) => {
        Object.entries(e).forEach(([ key, value ]) => {
            if (key in res) {
                if (Array.isArray(res[key]) && index > 1) {
                    res[key].push(value);
                } else {
                    res[key] = [ res[key], value ];
                }
            } else {
                if (index !== 0) {
                    res[key] = [];
                    Runner.fillSpace(res, getSymbol(key), index);
                    res[key].push(value);
                } else {
                    res[key] = value;
                }
            }
        });

        Object.keys(res) // добавить недостающие ключи, если не было значений
            .filter((k) => !Object.keys(e).includes(k))
            .forEach((k) => Array.isArray(res[k]) ? res[k].push(getSymbol(k)) : [ getSymbol(k) ]);
    });

    return res;
}

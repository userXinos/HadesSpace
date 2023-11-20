import { join } from 'path';

import Runner from '../modules/Runner.js';
import Modules from './Modules.js';
import loadFile from '../modules/loadFile.js';
import CONFIG from '../config.js';

export default class CapitalShips extends Runner {
    static config = {
        file: 'capital_ships',
        ignoreFiles: [ 'ship_spawners' ],
    };

    async run(rawData) {
        const [ { RedStar: { GhostSpawnSecs } }, { WhiteStar } ] = this.multiReadCsv([ 'solar_system_gen_data', 'stars' ]);
        const path = join(CONFIG.pathRaw, 'modules.csv');
        const modules = await loadFile(path, [ Modules ]).then((e) => e.render());

        const data = Runner.objectArrayify(rawData, {
            map: ([ key, value ]) => {
                // исправить скорости для форматера
                if ('Speed_WS' in value) {
                    value['Speed_WS'] = value['Speed_WS'] * WhiteStar.TimeSlowdownFactor / 100;
                }

                addModulesStats(value, modules);
                fixModulesShipsData(value);
                fixModulesShipsData(value, 'FlagshipModules', 'FlagshipModuleLevels');

                return [ key, value ];
            },
        });

        data.CerberusGhosts.GhostSpawnSecs = GhostSpawnSecs;

        return data;
    }
}

function getAsArray(e) {
    return (Array.isArray(e)) ? e : [ e ];
}

function addModulesStats(obj, modules) {
    const mod = [ ...getAsArray(obj.InitialModule) ];
    const lvl = [ ...getAsArray(obj.InitialModuleLevels) ];

    if (lvl.length < mod.length) {
        const [ lvl1 ] = lvl;
        for (let i = 0; i < mod.length; i++) {
            lvl[i] = lvl1;
        }
    }

    if (mod) {
        if (!mod?.some(Array.isArray)) {
            for (let i = 0; i < mod.length; i++) {
                const modName = mod[i];
                const modLvlIndex = lvl[i];
                const module = getModuleByLvl(modName, modLvlIndex);

                if (module) {
                    if (!obj.modules) {
                        obj.modules = [];
                    }
                    const level = (modLvlIndex) ? modLvlIndex + 1 : undefined;
                    obj.modules.push({ level, ...module });
                }
            }
        }
    }

    function getModuleByLvl(name, lvl, data = modules.data) {
        if (name in data) {
            return Runner.objectArrayify(data[name], {
                map: ([ key, value ]) => [
                    key,
                    (!Array.isArray(value)) ?
                        (typeof value != 'object') ?
                            value : getModuleByLvl(key, lvl, data[name]) :
                        value.every(Array.isArray) ?
                            value.map((e) => e[lvl]) : value[lvl],
                ],
            });
        }
        return null;
    }
}

// из "{key:[module1!module2], key2:[1!2]}" в "{module1:[1], module2:[2]}"
export function fixModulesShipsData(obj, moduleKey = 'InitialModule', moduleLevelsKey = 'InitialModuleLevels') {
    const res = { };
    let maxIndex = 0;
    let module = obj[moduleKey];
    const moduleLevels = obj[moduleLevelsKey];

    if (!module && !moduleLevels) {
        return;
    }
    if (Array.isArray(module) && Array.isArray(moduleLevels)) {
        if (module.length < moduleLevels.length) {
            const elem = module;
            module = [];

            while (module.length < moduleLevels.length) {
                module.push(elem);
            }
        }
        for (let i = 0; i < module.length; i++) {
            const modulesStr = getAsArray(module[i]);
            const lvlStr = getAsArray(moduleLevels[i]);
            maxIndex = i;

            modulesStr.forEach((module, j) => {
                const value = lvlStr[j] + 1;
                const stockValue = res[module];

                if (stockValue === undefined || stockValue === '') {
                    res[module] = value;
                } else {
                    if (Array.isArray(stockValue)) {
                        res[module].push(value);
                    } else {
                        res[module] = [ stockValue, value ];
                    }
                }
            });
        }
    } else {
        res[module] = moduleLevels;
    }

    delete obj[moduleKey];
    delete obj[moduleLevelsKey];

    Object.entries(Runner.fillSpace(res, 0, maxIndex + 1))
        .forEach(([ k, v ]) => {
            if (!obj.modules) {
                obj.modules = {};
            }
            obj.modules[k] = v;
        });
}

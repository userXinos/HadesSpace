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
        const [ shipSpawners, { RedStar: { GhostSpawnSecs } } ] = this.multiReadCsv([ 'ship_spawners', 'solar_system_gen_data' ]);
        const path = join(CONFIG.pathRaw, this.isNebulaBuild ? '/Nebula' : '/', 'modules.csv');
        const modules = await loadFile(path, [ Modules ]).then((e) => e.render());

        const data = Runner.objectArrayify(rawData, {
            //  => Modules Runner
            filter: ([ k ]) => !k.includes('Drone') && !Object.keys(Modules.config.runner.combineKeys).includes(k),
            map: ([ key, value ]) => {
                addModulesStats(value, modules);
                fixModulesShipsData(value);
                fixModulesShipsData(value, 'FlagshipModules', 'FlagshipModuleLevels');

                // исправить имена уникальных модулей флагмана
                if (key === 'CorpFlagship') {
                    Object.entries(Modules.config.runner.combineKeys).forEach(([ fixedName, name ]) => {
                        if (value.modules[name]) {
                            value.modules[fixedName] = value.modules[name];
                            delete value.modules[name];
                        }
                    });
                }
                if (key === 'CorpFlagship') {
                    Object.entries(Modules.config.runner.combineKeys).forEach(([ fixedName, name ]) => {
                        if (value.modules[name]) {
                            value.modules[fixedName] = value.modules[name];
                            delete value.modules[name];
                        }
                    });
                }
                return [ key, value ];
            },
        });

        data.CerberusGhosts.shipSpawners = shipSpawners['Ghosts'];
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

    function getModuleByLvl(name, lvl) {
        if (name in modules.data) {
            return Runner.objectArrayify(modules.data[name], {
                map: ([ key, value ]) => [
                    key,
                    (!Array.isArray(value)) ? value :
                        (value.every(Array.isArray) ? value.map((e) => e[lvl]) :
                            value[lvl]
                        ),
                ],
            });
        }
        return null;
    }
}

// из "{key:[module1!module2], key2:[1!2]}" в "{module1:[1], module2:[2]}"
export function fixModulesShipsData(obj, Modules = 'InitialModule', ModuleLevels = 'InitialModuleLevels') {
    const res = { };
    let maxIndex = 0;

    if (!obj[Modules] && !obj[ModuleLevels]) {
        return;
    }
    if (Array.isArray(obj[Modules]) && Array.isArray(obj[ModuleLevels])) {
        obj[Modules].forEach((_, i) => {
            const modulesStr = getAsArray(obj[Modules][i]);
            const lvlStr = getAsArray(obj[ModuleLevels][i]);
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
        });
    } else {
        res[obj[Modules]] = obj[ModuleLevels];
    }

    delete obj[Modules];
    delete obj[ModuleLevels];

    Object.entries(Runner.fillSpace(res, 0, maxIndex + 1))
        .forEach(([ k, v ]) => {
            if (!obj.modules) {
                obj.modules = {};
            }
            obj.modules[k] = v;
        });
}

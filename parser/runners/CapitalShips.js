import { join } from 'path';

import Runner from '../modules/Runner.js';
import Modules from './Modules.js';
import loadFile from '../modules/loadFile.js';
import CONFIG from '../config.js';

// noinspection JSCheckFunctionSignatures
const { data: modules } = await loadFile(join(CONFIG.pathRaw, 'modules.csv'), [ Modules ]).then((e) => e.render());

export default class CapitalShips extends Runner {
    static config = {
        file: 'capital_ships',
        ignoreFiles: [ 'ship_spawners' ],
    }

    run(rawData) {
        const [ shipSpawners, { RedStar: { GhostSpawnSecs } } ] = Runner.multiReadCsv([ 'ship_spawners', 'solar_system_gen_data' ]);

        const data = Object.fromEntries(
            Object.entries(rawData)
                .filter(([ k ]) => !k.endsWith('Drone')) // => Modules Runner
                .filter(([ k ]) => !Object.keys(Modules.config.runner.combineKeys).includes(k)) // => Modules Runner
                .map(([ key, value ]) => {
                    addModulesStats(value);
                    fixModulesShipsData(value, 'InitialModule', 'InitialModuleLevels');
                    fixModulesShipsData(value, 'FlagshipModules', 'FlagshipModuleLevels');
                    return [ key, value ];
                }),
        );

        data.CerberusGhosts.shipSpawners = shipSpawners['Ghosts'];
        data.CerberusGhosts.GhostSpawnSecs = GhostSpawnSecs;

        return data;
    }
}

function getAsArray(e) {
    return (Array.isArray(e)) ? e : [ e ];
}

function addModulesStats(obj) {
    const mod = [ ...getAsArray(obj.InitialModule) ];
    const lvl = [ ...getAsArray(obj.InitialModuleLevels) ];

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

                    if (typeof obj.InitialModule === 'string') {
                        delete obj.InitialModule;
                        delete obj.InitialModuleLevels;
                    } else {
                        obj.InitialModule.splice(obj.InitialModule.indexOf(modName), 1);
                        obj.InitialModuleLevels.splice(obj.InitialModuleLevels.indexOf(modLvlIndex), 1);
                    }
                }
            }
        }
    }

    function getModuleByLvl(name, lvl) {
        if (name in modules) {
            return Object.fromEntries(
                Object.entries(modules[name]).map(([ key, value ]) => [
                    key,
                    (!Array.isArray(value)) ? value :
                        (value.every(Array.isArray) ? value.map((e) => e[lvl]) :
                            value[lvl]
                        ),
                ]),
            );
        }
        return null;
    }
}

// из "{key:[module1!module2], key2:[1!2]}" в "{module1:[1], module2:[2]}"
function fixModulesShipsData(obj, Modules, ModuleLevels) {
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

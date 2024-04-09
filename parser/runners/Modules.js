import Runner from '../modules/Runner.js';
import Globals from './Globals.js';
import formatValueRulesTime from '../../src/regulation/formatValueRulesTime.mjs';

const EXCLUDE_KEYS_FROM_TIME = [ 'UnlockTime' ];

// noinspection SpellCheckingInspection
/* eslint-disable prefer-destructuring */

const CONFIG = Object.freeze({
    timeCharacteristics: formatValueRulesTime
        .map(([ keys ]) => keys.filter((k) => !EXCLUDE_KEYS_FROM_TIME.includes(k)))
        .flat(),
    starsOrder: [ 'YS', 'RS', 'WS', 'BS' ],
    allowedSpriteNamesMiningDrone: [
        'MiningDrone_lv1',
        'MiningDrone_lv2-3',
        'MiningDrone_lv4-6',
        'MiningDrone_lv7-9',
        'MiningDrone_lv10',
    ],
});

export default class Modules extends Runner {
    prettierConfig = {
        printWidth: 150,
    };

    static config = {
        file: 'modules',
        ignoreFiles: [ 'projectiles' ],
        runner: CONFIG,
    };

    run(rawData) {
        const dataTables = this.multiReadCsv([ 'capital_ships', 'projectiles', 'stars' ]);
        const getGlobalsBy = (k) => Globals.getGlobalsBy(k, this.readCsv.bind(this));

        return Runner.objectArrayify(rawData, {
            map: (...args) => dataMapCallback(...args, dataTables, getGlobalsBy),
            filter: ([ k ]) => k,
        });
    }
}

function dataMapCallback([ key, value ], index, array, [ capitalShips, projectiles, stars ], getGlobalsBy) {
    const TIME_SLOWDOWN_FACTOR_WS = stars.WhiteStar.TimeSlowdownFactor;
    const onlyWS = capitalShips.CorpFlagship.FlagshipModules.reduce((acc, elem) => {
        if (!Array.isArray(elem)) {
            elem = [ elem ];
        }
        for (const e of elem) {
            if (!acc.includes(e)) {
                acc.push(e);
            }
        }
        return acc;
    }, []);


    // добавить глобальные
    const glob = getGlobalsBy(key);
    Runner.combineObjects(value, glob);

    // добавить Projectiles
    if (value.WeaponEffectType === 'projectile') {
        value.projectile = projectiles[value.WeaponFx];

        if ('SpeedPVP' in value.projectile) {
            value.projectile['Speed_WS'] = value.projectile['SpeedPVP'] * TIME_SLOWDOWN_FACTOR_WS / 100;
            value.projectile['Speed_BS'] = value.projectile['SpeedPVP'];
            delete value.projectile['SpeedPVP'];
        }
    }

    // добавить данные дронов/турелей
    if (value.SpawnedShip) {
        let SpawnedShip = Object.values(capitalShips)[value.SpawnedShip];

        if (!key.endsWith('Drone') && SpawnedShip.Name in Object.fromEntries(array)) {
            const sameModuleIndex = array.findIndex(([ k ]) => k == SpawnedShip.InitialModule);

            SpawnedShip = Runner.combineObjects(array[sameModuleIndex][1], SpawnedShip);
            array[sameModuleIndex][0] = undefined; // просто чтобы потом фильром снести

            [ 'Speed_YS', 'Speed_RS', 'Speed_BLS', 'Speed_WS', 'InitialModule' ]
                .forEach((k) => delete SpawnedShip[k]);
            if (SpawnedShip.SpawnLifetime_WS) {
                SpawnedShip.SpawnLifetime_WS = SpawnedShip.SpawnLifetime_WS * TIME_SLOWDOWN_FACTOR_WS;
            }
            value.turret = SpawnedShip;
        } else {
            value.drone = SpawnedShip;
        }

        if ('InitialModule' in SpawnedShip) {
            const modules = Object.fromEntries(array);
            const shipModules = [];

            if (Array.isArray(SpawnedShip.InitialModule)) {
                SpawnedShip.InitialModule.forEach((name) => {
                    shipModules.push(modules[name]);
                });
            } else {
                shipModules.push(modules[SpawnedShip.InitialModule]);
            }
            value.modules = shipModules.map((mod) => {
                // в душе не чаю почему на этом моде эта хрень, хотя другие его WS статы в правильном формате
                if (mod.ActivationPrepWS && mod.Name === 'DeltaDroneTeleport') {
                    mod.ActivationPrepWS = mod.ActivationPrepWS * TIME_SLOWDOWN_FACTOR_WS;
                }
                return mod;
            });
        }

        [ 'InitialModule', 'InitialModuleLevels', 'IsDrone', 'IsTurret' ].forEach((k) => delete SpawnedShip[k]);
        delete value.SpawnedShip;
    }

    // посчитать саппорт урон для Луча
    if (key === 'ChainRay') {
        const LinkDPSBoostPct = (value.LinkDPSBoostPct + 100) / 100;

        value.LinkDPSBoost = value.DPS.map((e) => e * LinkDPSBoostPct);
        value.LinkDPSBoostWS = value.DPS_WS.map((e) => Math.floor(e * LinkDPSBoostPct));
    }

    // пупупу
    if (key === 'Suspend') {
        Object.keys(value).forEach((k) => {
            if (k.includes('DamageAmplify')) {
                const nK = k.replace('DamageAmplify', 'DamageReduce');
                value[nK] = value[k];
                delete value[k];
            }
        });
    }

    if (key === 'Genesis') {
        value.MaxNewHydro_YS = value.HydroPerNewAsteroid_YS.map(((e) => e * value.MaxNewAsteroids_PvE));
        value.MaxNewHydro_RS = value.HydroPerNewAsteroid_RS.map(((e) => e * value.MaxNewAsteroids_PvE));
        value.MaxNewHydro_WS = value.HydroPerNewAsteroid_WS.map(((e) => e * value.MaxNewAsteroids_PvP));

        [ 'HydroPerNewAsteroid_YS', 'HydroPerNewAsteroid_RS', 'HydroPerNewAsteroid_WS' ].forEach((k) => delete value[k]);
    }

    if (key === 'Enrich') {
        value.IncreaseSectorHydroPct_RS = value.IncreaseSectorHydroPct.map((e) => e * value.RSEnrichMod);
        delete value['RSEnrichMod'];
    }


    // фикс БЗ стат
    if (!value.Hide || (onlyWS.includes(key) && value.Hide)) {
        fixWSTimeChats(value, TIME_SLOWDOWN_FACTOR_WS);
    }

    // добавить/удалить данные звёзд
    addInfoByStarType(value, TIME_SLOWDOWN_FACTOR_WS, (onlyWS.includes(key) && value.Hide) ? [ 2 ] : undefined);

    return [ key, value ];
}


function fixWSTimeChats(value, TIME_SLOWDOWN_FACTOR_WS) {
    for (const k in value) {
        if (k in value) {
            if (!Array.isArray(value[k]) && typeof value[k] == 'object') {
                fixWSTimeChats(value[k], TIME_SLOWDOWN_FACTOR_WS);
                continue;
            }
            if (k.endsWith('WS') && CONFIG.timeCharacteristics.includes(k.replace(/_?WS/, ''))) {
                applyCoefficient(value, k);
            }
        }
    }

    function applyCoefficient(body, key, factor = TIME_SLOWDOWN_FACTOR_WS) {
        if (Array.isArray(body[key])) {
            body[key].forEach((e, i, arr) => arr[i] = e * factor);
        } else {
            body[key] = body[key] * factor;
        }
    }
}
function addInfoByStarType(value, TIME_SLOWDOWN_FACTOR_WS, ast = value.AllowedStarTypes) {
    const keysRemove = [ 'AllowedStarTypes' ];
    const hasSeparateBLSValues = (e) => /_?(BS|BLS)$/.test(e);

    if (ast !== undefined) {
        CONFIG.starsOrder.forEach((star, starIndex) => {
            if (Array.isArray(ast) ? ast.includes(starIndex) : ast === starIndex) {
                addStarInfo(value, star);
            } else {
                removeStarInfo(value, star);
            }
        });
    } else {
        for (const e of CONFIG.starsOrder) {
            if (e === 'BS' && !Object.keys(value).some(hasSeparateBLSValues)) {
                return;
            }
            addStarInfo(value, e);
        }
    }
    keysRemove.forEach((e) => delete value[e]);

    for (const v of Object.values(value)) {
        if (typeof v === 'object' && !Array.isArray(v)) {
            addInfoByStarType(v, TIME_SLOWDOWN_FACTOR_WS, ast);
        }
    }


    function addStarInfo(obj, star) {
        const coefficient = (v) => {
            if (star === 'WS') return v * TIME_SLOWDOWN_FACTOR_WS;
            if (star === 'BS') return v;
            return v;
        };
        const getKeyPostfix = (k) => new RegExp(`${k}_?${star == 'BS' ? '(BS|BLS)' : star}$`);

        if (star === 'YS') return;
        Object.entries(obj)
            .filter(([ k ]) => CONFIG.timeCharacteristics.includes(k))
            .forEach(([ key, value ]) => {
                const keyPostfix = getKeyPostfix(key);
                const keyWithPostfix = Object.keys(obj).find((k) => keyPostfix.test(k));

                if (!keyWithPostfix) {
                    const newKey = key + star;
                    let newValue;
                    let isEqual;

                    if (Array.isArray(value)) {
                        newValue = value.map(coefficient);
                        isEqual = newValue[0] === value[0];
                    } else {
                        newValue = coefficient(value);
                        isEqual = newValue === value;
                    }
                    if (keysRemove.includes(key) || !isEqual) { // дубликаты RS == YS
                        obj[newKey] = newValue;
                    }
                }
            });
    }
    function removeStarInfo(obj, star) {
        Object.keys(obj)
            .filter((e) => CONFIG.timeCharacteristics.includes(e))
            .forEach((key) => {
                let regex;

                if (star === 'YS') {
                    regex = new RegExp(key);
                } else {
                    regex = new RegExp(`${key}_?${star}`);
                }
                const matches = Object.keys(obj)
                    .filter((e) => regex.test(e));
                if (matches.length) {
                    keysRemove.push(matches[0]);
                }
            });
    }
}

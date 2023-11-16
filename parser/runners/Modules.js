import Runner from '../modules/Runner.js';
import Globals from './Globals.js';

import { fixModulesShipsData } from './CapitalShips.js';
import formatValueRulesTime from '../../src/regulation/formatValueRulesTime.mjs';

const EXCLUDE_KEYS_FROM_TIME = [ 'UnlockTime' ];

// noinspection SpellCheckingInspection
/* eslint-disable prefer-destructuring */

const CONFIG = Object.freeze({
    timeCharacteristics: formatValueRulesTime
        .map(([ keys ]) => keys.filter((k) => !EXCLUDE_KEYS_FROM_TIME.includes(k)))
        .flat(),
    combineKeys: {
        FlagshipDartBarrage: 'FlagshipWeaponModule',
        FlagshipAreaShield: 'FlagshipShieldModule',
        // FlagshipDroneSwarm: 'FlagshipDrone',
        LaserTurret: 'LaserTurret_Laser',
    },
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
        const dataTables = this.multiReadCsv([
            'capital_ships',
            'projectiles',
            'stars',
        ]);
        const getGlobalsBy = (k) => Globals.getGlobalsBy(k, this.readCsv.bind(this));
        const data = Runner.objectArrayify(rawData, {
            map: (...args) => dataMapCallback(...args, dataTables, getGlobalsBy),
        });
        const TIME_SLOWDOWN_FACTOR_WS = dataTables[2].WhiteStar.TimeSlowdownFactor;

        Object.values(CONFIG.combineKeys).forEach((e) => delete data[e]);
        data.FlagshipDartBarrage.FlagshipWeaponModule.SpawnLifetime_WS = data.FlagshipDartBarrage.FlagshipWeaponModule.SpawnLifetime_WS * TIME_SLOWDOWN_FACTOR_WS;
        data.FlagshipAreaShield.FlagshipShieldModule.SpawnLifetime_WS = data.FlagshipAreaShield.FlagshipShieldModule.SpawnLifetime_WS * TIME_SLOWDOWN_FACTOR_WS;
        data.FlagshipDroneSwarm.SpawnLifetime_WS = data.FlagshipDroneSwarm.SpawnLifetime_WS * TIME_SLOWDOWN_FACTOR_WS;

        return data;
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

    // слить подобные вместе
    if (key in CONFIG.combineKeys) {
        const k = CONFIG.combineKeys[key];
        value[k] = { ...Object.fromEntries(array)[k] };

        if (onlyWS.includes(k)) {
            onlyWS.push(key);
        }
    }

    // добавить глобальные
    const glob = getGlobalsBy(key);
    Runner.combineObjects(value, glob);


    // добавить Projectiles
    if (value.WeaponEffectType === 'projectile') {
        value.projectile = projectiles[value.WeaponFx];
    }

    // добавить данные дронов
    if (key.includes('Drone')) {
        value.drone = capitalShips[value.Name] || capitalShips[`${value.Name}Ship`];

        if (key == 'FlagshipDroneSwarm') {
            value.drone = capitalShips.FlagshipDrone;
            delete value.drone.InitialModule[value.drone.InitialModule.findIndex((e) => e == 'Recoil')];
        }

        if (value.drone) {
            fixModulesShipsData(value.drone);
        }
    }

    // добавить LaserTurret данные
    if (key === 'LaserTurret') {
        Runner.combineObjects(value.LaserTurret_Laser, capitalShips.LaserTurret);
    }

    // посчитать саппорт урон для Луча
    if (key === 'ChainRay') {
        const LinkDPSBoostPct = value.LinkDPSBoostPct + 100;

        value.LinkDPSBoost = value.DPS.map((e) => e * LinkDPSBoostPct / 100);
        value.LinkDPSBoostWS = value.DPS_WS.map((e) => Math.floor(e * (3600 / TIME_SLOWDOWN_FACTOR_WS) * LinkDPSBoostPct / 100));
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

    // DPS -> DPH для БЗ
    if (Object.keys(value).some((k) => k.startsWith('DPS_WS') || k == 'AddDPSPerTarget_WS')) {
        const fak = TIME_SLOWDOWN_FACTOR_WS / 100;

        Object.keys(value).forEach((k) => {
            if (k.startsWith('DPS_WS')) {
                const newK = k.replace('DPS', 'DPH');
                value[newK] = value[k].map((e) => e * fak);
                delete value[k];
            }
            if (k == 'AddDPSPerTarget_WS') {
                value[k] = value[k].map((e) => e * fak);
            }
        });
    }


    // фикс БЗ стат
    fixWSChats(value, TIME_SLOWDOWN_FACTOR_WS);

    // добавить/удалить данные звёзд

    addInfoByStarType(value, TIME_SLOWDOWN_FACTOR_WS, (onlyWS.includes(key) && value.Hide) ? [ 2 ] : undefined);

    return [ key, value ];
}


function fixWSChats(value, TIME_SLOWDOWN_FACTOR_WS) {
    if (value.Hide) {
        return;
    }

    for (const k in value) {
        if (k in value) {
            if (!Array.isArray(value[k]) && typeof value[k] == 'object') {
                fixWSChats(value[k], TIME_SLOWDOWN_FACTOR_WS);
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
            if (e === 'BS' && Object.keys(value).some(hasSeparateBLSValues)) {
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
            if (star === 'BS') return v * 2;
            return v;
        };
        const getKeyPostfix = (k) => new RegExp(`${k}_?${star}$`);

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

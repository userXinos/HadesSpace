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
            'artifacts',
            'stars',
        ]);
        const getGlobalsBy = (k) => Globals.getGlobalsBy(k, this.readCsv.bind(this));
        const data = Runner.objectArrayify(rawData, {
            map: (...args) => dataMapCallback(...args, dataTables, getGlobalsBy, this.isNebulaBuild),
        });
        const TIME_SLOWDOWN_FACTOR_WS = dataTables[3].WhiteStar.TimeSlowdownFactor;

        Object.values(CONFIG.combineKeys).forEach((e) => delete data[e]);
        data.FlagshipDartBarrage.TID_Description = data.FlagshipDartBarrage.TID_Description[0]; // какие-то буквы лишние в таблице
        data.FlagshipDartBarrage.FlagshipWeaponModule.SpawnLifetime_WS = data.FlagshipDartBarrage.FlagshipWeaponModule.SpawnLifetime_WS * TIME_SLOWDOWN_FACTOR_WS; // ...
        data.FlagshipAreaShield.FlagshipShieldModule.SpawnLifetime_WS = data.FlagshipAreaShield.FlagshipShieldModule.SpawnLifetime_WS * TIME_SLOWDOWN_FACTOR_WS; // ...
        delete data['FlagshipDartBarrage']['TID_Description']; // какие-то буквы лишние в таблице

        if (data.TimeWarp) {
            data.TimeWarp.Icon = 'Mod_TimeWarp_Icon'; // ошибка в таблице, 'w' в иконках в верхнем регистре
        }

        if (!this.isNebulaBuild) {
            data.MiningBoost.WhiteStarScore.unshift(0); // ошибка в таблице, не хватает "0"
            data.Destiny.WhiteStarScore.unshift(0); // ошибка в таблице, не хватает "0"
        }

        return data;
    }
}

function dataMapCallback([ key, value ], index, array, [ capitalShips, projectiles, artifacts, stars ], getGlobalsBy, isNebulaBuild) {
    const TIME_SLOWDOWN_FACTOR_WS = stars.WhiteStar.TimeSlowdownFactor;

    // слить подобные вместе
    if (key in CONFIG.combineKeys) {
        const k = CONFIG.combineKeys[key];
        value[k] = { ...Object.fromEntries(array)[k] };
    }

    // добавить глобальные
    const glob = getGlobalsBy(key);
    Runner.combineObjects(value, glob);

    // добавить уровень артефакта
    if (!value.Hide) {
        Object.values(artifacts).forEach((art) => {
            if (!art.BlueprintTypes) {
                return;
            }
            if (!isNebulaBuild) {
                if (art.MaxModuleLevelToAward === value.AwardLevel && art.BlueprintTypes.includes(value.SlotType)) {
                    value.TID_Artifact = art.TID;
                }
            }
        });
    }

    // добавить Projectiles
    if (value.WeaponEffectType === 'projectile') {
        value.projectile = projectiles[value.WeaponFx];
    }

    // добавить данные дронов
    if (key.includes('Drone')) {
        value.drone = capitalShips[value.Name] || capitalShips[`${value.Name}Ship`];

        if (value.drone) {
            fixModulesShipsData(value.drone);
        }
    }

    // опрокинуть Salvage
    if (value.SalvageHullPercent) {
        value.SalvageHullPercent = Runner.transposeMatrix(value.SalvageHullPercent);
    }

    // добавить LaserTurret данные
    if (key === 'LaserTurret') {
        Runner.combineObjects(value.LaserTurret_Laser, capitalShips.LaserTurret);
    }

    // разрешить спрайты майниг дрона
    if (key === 'MiningDrone' && !isNebulaBuild) {
        const pattern = 'MiningDrone_lv';
        const ranges = CONFIG.allowedSpriteNamesMiningDrone
            .map((e) => e.replace(pattern, ''))
            .map((e) => e.split('-').map(Number));

        value.drone.Model = value.drone.Model.map((e) => {
            const number = Number(e.replace(pattern, ''));
            const i = ranges.findIndex(([ start, end ]) => {
                if (!end) {
                    return (number === start);
                }
                return (number >= start && number <= end);
            });
            return CONFIG.allowedSpriteNamesMiningDrone[i];
        });
    }

    // исправить название статы скачка
    if (key === 'Leap') {
        value.DisableTime = value.EffectDurationx10 / 10;
        delete value.EffectDurationx10;
    }

    // посчитать саппорт урон для Луча
    if (key === 'ChainRay') {
        const LinkDPSBoostPct = value.LinkDPSBoostPct + 100;

        value.LinkDPSBoost = value.DPS.map((e) => e * LinkDPSBoostPct / 100);
        value.LinkDPSBoostWS = value.DPS_WS.map((e) => Math.floor(e * (3600 / TIME_SLOWDOWN_FACTOR_WS) * LinkDPSBoostPct / 100));
    }

    // фикс БЗ стат
    fixWSChats(value, TIME_SLOWDOWN_FACTOR_WS);

    // добавить/удалить данные звёзд
    addInfoByStarType(value, TIME_SLOWDOWN_FACTOR_WS);

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
    const hasSeparateBLSValues = (e) => /_?BS$/.test(e);

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

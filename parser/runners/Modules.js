import Runner from '../modules/Runner.js';
import Globals from './Globals.js';

// noinspection SpellCheckingInspection
/* eslint-disable prefer-destructuring */
const CONFIG = Object.freeze({
    starHeaders: [
        'EffectDurationx10',
        'ActivationDelay',
        'ActivationPrep',
        'MaxDPSTime',
        'APTPIOTTP',
        'DisableTime',
        'ProximityTriggerSec',
        'RelicLoad',
        'SpawnLifetime',
        'TurretSetupTime',
    ],
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
        ]);
        const data = Runner.objectArrayify(rawData, {
            map: (...args) => dataMapCallback(...args, dataTables),
        });

        Object.values(CONFIG.combineKeys).forEach((e) => delete data[e]);
        data.TimeWarp.Icon = 'Mod_TimeWarp_Icon'; // ошибка в таблице, 'w' в иконках в верхнем регистре
        data.MiningBoost.WhiteStarScore.unshift(0); // ошибка в таблице, не хватает "0"
        data.Destiny.WhiteStarScore.unshift(0); // ошибка в таблице, не хватает "0"
        data.FlagshipDartBarrage.TID_Description = data.FlagshipDartBarrage.TID_Description[0]; // какие-то буквы лишние в таблице
        data.FlagshipDartBarrage.FlagshipWeaponModule.SpawnLifetime_WS = data.FlagshipDartBarrage.FlagshipWeaponModule.SpawnLifetime_WS * 600; // ...
        data.FlagshipAreaShield.FlagshipShieldModule.SpawnLifetime_WS = data.FlagshipAreaShield.FlagshipShieldModule.SpawnLifetime_WS * 600; // ...
        delete data['FlagshipDartBarrage']['TID_Description']; // какие-то буквы лишние в таблице

        return data;
    }
}

function dataMapCallback([ key, value ], index, array, [ capitalShips, projectiles, artifacts ]) {
    // слить подобные вместе
    if (key in CONFIG.combineKeys) {
        const k = CONFIG.combineKeys[key];
        value[k] = { ...Object.fromEntries(array)[k] };
    }

    // добавить глобальные
    const glob = Globals.getGlobalsBy(key);
    Runner.combineObjects(value, glob);

    // добавить уровень артефакта
    if (!value.Hide) {
        Object.values(artifacts).forEach((art) => {
            if (!art.BlueprintTypes) {
                return;
            }
            if (art.MaxModuleLevelToAward === value.AwardLevel && art.BlueprintTypes.includes(value.SlotType)) {
                value.TID_Artifact = art.TID;
            }
        });
    }

    // добавить Projectiles
    if (value.WeaponEffectType === 'projectile') {
        value.projectile = projectiles[value.WeaponFx];
    }

    // добавить данные дронов
    if (key.includes('Drone')) {
        value.drone = capitalShips[value.Name];
    }

    // фикс БЗ стат
    if (value.EffectDurationx10WS) {
        value.EffectDurationx10WS.forEach((e, i, arr) => {
            arr[i] = e * 60;
        });
    }
    if (value.ActivationPrepWS && !value.Hide) {
        if (Array.isArray(value.ActivationPrepWS)) {
            value.ActivationPrepWS.forEach((e, i, arr) => {
                arr[i] = e * 600;
            });
        } else {
            value.ActivationPrepWS = value.ActivationPrepWS * 600;
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
    if (key === 'MiningDrone') {
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

    // добавить/удалить данные звёзд
    addInfoByStarType(key, value);

    return [ key, value ];
}

function addInfoByStarType(key, value) {
    const keysRemove = [ 'AllowedStarTypes' ];
    const ast = value.AllowedStarTypes;
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
        CONFIG.starsOrder.forEach((e) => {
            if (e === 'BS' && Object.keys(value).some(hasSeparateBLSValues)) {
                return;
            }
            addStarInfo(value, e);
        });
    }
    keysRemove.forEach((e) => delete value[e]);

    Object.entries(value).forEach(([ k, v ]) => {
        if (typeof v === 'object' && !Array.isArray(v)) {
            addInfoByStarType(k, v);
        }
    });


    function addStarInfo(obj, star) {
        const coefficient = (v) => {
            if (star === 'WS') return v * 600;
            if (star === 'BS') return v * 2;
            return v;
        };
        const getKeyPostfix = (k) => new RegExp(`${k}_?${star}$`);

        if (star === 'YS') return;
        Object.entries(obj)
            .filter(([ k ]) => CONFIG.starHeaders.includes(k))
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
            .filter((e) => CONFIG.starHeaders.includes(e))
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

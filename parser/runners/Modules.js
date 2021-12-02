import Runner from '../modules/Runner.js';
import Globals from './Globals.js';
import * as config from '../../config/modules.js';

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
    excludeKeysStringStar: [ 'NoCerbBondTeleportPRS' ],
});

export default class Modules extends Runner {
    static config = {
        file: 'modules',
        ignoreFiles: [ 'projectiles' ],
        runner: CONFIG,
    }

    run(rawData) {
        const [ capitalShips, projectiles, artifacts ] = Runner.multiReadCsv([
            'capital_ships',
            'projectiles',
            'artifacts',
        ]);
        const data = Object.fromEntries(
            Object.entries(rawData).map(dataMapCallback),
        );

        Object.values(CONFIG.combineKeys).forEach((e) => delete data[e]);
        data['TimeWarp']['Icon'] = 'Mod_TimeWarp_Icon'; // ошибка в таблице, 'w' в иконках в верхнем регистре
        data['MiningBoost']['WhiteStarScore'].unshift(0); // ошибка в таблице, не хватает "0"
        data['Destiny']['WhiteStarScore'].unshift(0); // ошибка в таблице, не хватает "0"
        data['MiningDrone']['MiningSpeed'] = [ 29.1, 33.3, 37.5, 41.7, 45.8, 52.2, 58.8, 65.2, 74.1, 85.7 ]; // хз как считать это
        data['FlagshipDartBarrage']['TID_Description'] = data['FlagshipDartBarrage']['TID_Description'][0]; // какие-то буквы лишние в таблице

        return data;


        function dataMapCallback([ key, value ]) {
            // слить подобные вместе
            if (key in CONFIG.combineKeys) {
                const k = CONFIG.combineKeys[key];
                value[k] = { ...rawData[k] };
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

            // добавить макс бонус DroneShipment
            if (value.DroneShipmentBonus) {
                value.DroneShipmentBonusMax = value.DroneShipmentBonus
                    .map((e, i) => (value.SpawnCapacity[i] - 1) * e);
            }

            // фикс БЗ стат
            if (value.EffectDurationx10WS) {
                value.EffectDurationx10WS.forEach((e, i, arr) => {
                    arr[i] = e * 60;
                });
            }

            // опрокинуть Salvage
            if (value.SalvageHullPercent) {
                value.SalvageHullPercent = Runner.transposeMatrix(value.SalvageHullPercent);
            }

            // добавить LaserTurret данные
            if (key === 'LaserTurret') {
                Runner.combineObjects(value.LaserTurret_Laser, capitalShips.LaserTurret);
            }

            // добавить/удалить данные звёзд
            const keysRemove = [];
            if (value.AllowedStarTypes !== undefined) {
                CONFIG.starsOrder.forEach((star, starIndex) => {
                    if (Array.isArray(value.AllowedStarTypes)) {
                        if (value.AllowedStarTypes.includes(starIndex)) {
                            _addStarInfo(value, star);
                        } else {
                            _removeStarInfo(value, star);
                        }
                    } else {
                        if (value.AllowedStarTypes === starIndex) {
                            _addStarInfo(value, star);
                        } else {
                            _removeStarInfo(value, star);
                        }
                    }
                });
            } else {
                config.starsOrder.forEach((e) => _addStarInfo(value, e));
            }
            keysRemove.push('AllowedStarTypes');
            keysRemove.forEach((e) => delete value[e]);

            function _addStarInfo(obj, star) {
                const coefficient = (v) => {
                    if (star === 'WS') return v * 600;
                    if (star === 'BS') return v * 2;
                    return v;
                };

                if (star === 'YS') return;
                Object.keys(obj)
                    .filter((e) => CONFIG.starHeaders.includes(e))
                    .filter((e) => !Object.keys(obj).includes(e + star))
                    .forEach((key) => {
                        const matches = Object.keys(obj) // где-то есть "_", где-то нету...
                            .filter((e) => new RegExp(`${key }.+?${ star}`).test(e));
                        if (!matches.length) {
                            const newKey = key + star;
                            const value = obj[key];
                            let newValue;
                            let isEqual;

                            if (Array.isArray(value)) {
                                newValue = value.map((e) => coefficient(e));
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
            function _removeStarInfo(obj, star) {
                Object.keys(obj)
                    .filter((e) => CONFIG.starHeaders.includes(e))
                    .forEach((key) => {
                        let regex;

                        if (star === 'YS') {
                            regex = new RegExp(key);
                        } else {
                            regex = new RegExp(`${key }.+?${ star}`);
                        }
                        const matches = Object.keys(obj)
                            .filter((e) => regex.test(e));
                        if (matches.length) {
                            keysRemove.push(matches[0]);
                        }
                    });
            }

            return [ key, value ];
        }
    }
}

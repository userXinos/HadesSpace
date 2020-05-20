"use strict";
exports.default = function (name, header, value) { // скрыть/исправить значения для красоты результата
    let data = [
        {
            header: ["HealRate"],
            func: (v) => v / 200
        },
        {
            header: ["FuelUsePer5000Distance"],
            func: (v) => v / 5
        },
        {
            header: ["Speed"],
            func: (v) => v * 6
        },
        {
            header: ["ActivationPrepWS", "SpawnLifetime_WS"],
            func: (v) => v * 3600 / 6
        },
        {
            header: ["EffectRadiusWS", "EffectRadiusBS", "EffectRadius", "DamageRange", "DamageRangeWhenNeutralized", "ShipmentsPerHour", "EffectDurationx10", "EffectDurationx10BS", "RadiusMax"],
            func: (v) => v / 10
        },
        {
            header: ["TimeWarpFactor", "MiningSpeedModifierPct"],
            func: (v) => v / 100
        },
        {
            header: ["APTPIOTTP"],
            func: (v) => v / 5
        },
        {
            header: ["TimeSpeedupFactor"],
            func: (v) => v / 10000
        },
        {
            header: ["PassiveIncomeModifier"],
            func: (v) => v - 100
        },
        {
            header: ["BlueStar_HydroPctPerPos"],
            func: (v) => v / 10
        }
    ]

    if (ignoringHeaders.includes(header)) return value
    if (exports.isHide(name, header)) return null
    for (let i in data) {
        let obj1 = data[i]
        if (obj1.header.includes(header)) {
            return obj1.func(value)
        }
    }
    if (value >= 0) {
        return parseInt(value)
    }
    return value
}
exports.isHide = function (name, header, isStrict = false) { // скрывает невалидные данные: "0", " " или просто ненужные,  strict - скрыть валидные данные (2я проверка)
    let data1 = [
        {
            name: ['WeakBattery'],
            headers: ['UnlockPrice', 'UnlockBlueprints', 'UnlockTime']
        },
        {
            name: ['MineralStorageCapacity', 'MassMining'],
            headers: ['FuelUseIncrease']
        },
        {
            name: ['WeakShield', 'Recall', 'HydrogenUpload'],
            headers: ['WhiteStarScore'] // = "0"
        },
        {
            name: ['Transport', 'Miner'],
            headers: ['HP']
        },
        {
            name: ['Miner'],
            headers: ['FuelUsePer5000Distance']
        },
        {
            name: ['Battleship'],
            headers: ['InitialModule', 'InitialModuleLevels', 'HydrogenCapacity']
        },
        {
            name: ['CorpFlagship'],
            headers: ['DesignUpgradeTime', 'BuildCost', 'FuelUsePer5000Distance', 'JumpFuelCosts']
        },
        {
            name: ['ShipmentDrone', 'MiningDrone'],
            headers: ['NewModuleSlots', 'JobCapacity', 'MiningPeriod']
        },
        {
            name: ['ShipmentDrone'],
            headers: ['HP']
        },
        {
            name: ['GuardianBattery', 'WeakBattery', 'InterceptorMBattery', 'ColossusLaser', 'DestroyerVengeance', 'BomberLauncher', 'PhoenixShield', 'DartBarrage'],
            headers: ['ShowWSInfo', 'UnlockPrice', 'UnlockBlueprints', 'UnlockTime', 'WhiteStarScore', 'Install', 'BCCost', 'FuelUseIncrease']
        },
        {
            name: ['AlphaDrone', 'CerberusSentinel', 'CerberusGuardian', 'CerberusInterceptor', 'CerberusColossus', 'CerberusDestroyer', 'CerberusBomber', 'CerberusPhoenix', 'CerberusStorm', 'CerberusGhosts', 'CerberusHydra', 'Hydraling1', 'Hydraling2'],
            headers: ['NewModuleSlots', 'BuildCost', 'HideModulesOnHUD', 'BSPenaltyPerSec', 'DesignUpgradeCost', 'DesignUpgradeTime', 'ShipAIHandler', 'AIUpdateIntervalSeconds', 'AggressiveAI', 'OnDestroySpawn', 'BSPenaltyPerSecOnSector']
        },
        {
            name: ['CerberusGuardian', 'CerberusInterceptor', 'CerberusDestroyer', 'CerberusBomber', 'CerberusStorm', 'CerberusGhosts', 'CerberusPhoenix', 'CerberusHydra', 'Hydraling1', 'Hydraling2'],
            headers: ['ApplyModuleOnDockedObjectDestroy', 'OnDestroySpawnMinRadius', 'OnDestroySpawnMaxRadius']
        },
        {
            name: ['BlueStar'],
            headers: ['HydrogenSearchCost', 'MaxBattleshipsPerPlayer']
        },
        {
            name: ['BlueStar', 'RedStar', 'WhiteStar'],
            headers: ['WSShipEventCRRewards', 'WSShipEventTopBrackets', 'WSHQAsteroidsPerBucket', 'FleetDepartTimeInSeconds_WS', 'MaxWaypointsWS', 'DontAllowUseOfEnemyWSGate', 'WSShipXPCollectEnabled', 'WSShipMinXP', 'WSShipXPEventClientDisplayMode', 'WSShipXPEventVersion', 'BlueStar_HydroPctPerMatch', 'DisableRSSearchDuringTutorial', 'WarnOnSRSPlacementMinNumNeighbors', 'PrivateRSEventClientDisplayMode', 'BlueStar_CRRewardWinLimit']
        },
        {
            name: ['RemoteBomb'],
            headers: ['Speed']
        },
        {
            name: ['RedStar'],
            headers: ['GhostSpawner']
        },
        {
            name: ['globals'],
            headers: ['BondMinPullVector', 'BondMaxPullListSize', 'BondWorksOnLoadingTransport']
        },
        {
            name: ['HomeSystem1', 'HomeSystem2', 'HomeSystem3'],
            headers: ['ShipLevel', 'WeaponFx']
        },
    ];
    let strict = [
        {
            name: ['Recoil', 'Immolation', 'EMPRocket'],
            headers: ['ActivationPrep', 'ActivationDelay', 'DisableTime']
        },
        {
            name: ['ShipmentDrone'],
            headers: ['SpawnLifetime_WS']
        }
    ];

    let data = (isStrict) ? strict : data1
    for (let i in data) {
        let obj1 = data[i]
        if (obj1.name.includes(name)) {
            if (obj1.headers.includes(header)) {
                return true
            }
        }
    }
    return false
};
exports.isWhiteListBS = function (header, name) {
    let data = [
        {
            headers: ["ActivationPrep"],
            names: ["Vengeance"]
        },
        {
            headers: ["ActivationDelay", "MaxDPSTime", "APTPIOTTP"],
            names: [''] // нужны только БЗ статы
        }
    ]
    for (let i of data) {
        if (i.headers.includes(header)) {
            if (i.names.includes(name)) {
                return true;
            } else {
                return false;
            };
        };
    }
    return true;
}
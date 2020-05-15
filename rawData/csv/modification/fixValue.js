let hide = [
    {
        name: ['WeakBattery'],
        headers: ['UnlockPrice', 'UnlockBlueprints', 'UnlockTime']
    },
    {
        name: ['MineralStorageCapacity', 'MassMining'],
        headers: ['FuelUseIncrease']
    },
    {
        name: ['MiningDrone'],
        headers: ['MiningPeriod']
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
        headers: ['NewModuleSlots', 'HP', 'JobCapacity', 'ShipAIHandler', 'AIUpdateIntervalSeconds']
    },
    {
        name: ['GuardianBattery', 'WeakBattery', 'InterceptorMBattery', 'ColossusLaser', 'DestroyerVengeance', 'BomberLauncher', 'PhoenixShield', 'DartBarrage'],
        headers: ['ShowWSInfo', 'UnlockPrice', 'UnlockBlueprints', 'UnlockTime', 'WhiteStarScore', 'Install', 'BCCost', 'FuelUseIncrease']
    },
    {
        name: ['AlphaDrone', 'CerberusSentinel', 'CerberusGuardian', 'CerberusInterceptor', 'CerberusColossus', 'CerberusDestroyer', 'CerberusBomber', 'CerberusPhoenix', 'CerberusStorm', 'CerberusGhosts'],
        headers: ['NewModuleSlots', 'BuildCost', 'HideModulesOnHUD', 'BSPenaltyPerSec', 'DesignUpgradeCost', 'DesignUpgradeTime', 'ShipAIHandler', 'AIUpdateIntervalSeconds', 'AggressiveAI', 'OnDestroySpawn', 'BSPenaltyPerSecOnSector']
    },
    {
        name: ['CerberusGuardian', 'CerberusInterceptor', 'CerberusDestroyer', 'CerberusBomber', 'CerberusStorm', 'CerberusGhosts', 'CerberusPhoenix'],
        headers: ['ApplyModuleOnDockedObjectDestroy', 'OnDestroySpawnMinRadius', 'OnDestroySpawnMaxRadius']
    },
    {
        name: ['BlueStar'],
        headers: ['HydrogenSearchCost', 'MaxBattleshipsPerPlayer']
    },
    {
        name: ['BlueStar', 'RedStar', 'WhiteStar'],
        headers: ['WSShipEventCRRewards', 'WSShipEventTopBrackets', 'WSHQAsteroidsPerBucket', 'FleetDepartTimeInSeconds_WS', 'MaxWaypointsWS', 'DontAllowUseOfEnemyWSGate', 'WSShipXPCollectEnabled', 'WSShipMinXP', 'WSShipXPEventClientDisplayMode', 'WSShipXPEventVersion', 'BlueStar_HydroPctPerMatch', 'DisableRSSearchDuringTutorial', 'WarnOnSRSPlacementMinNumNeighbors', 'PrivateRSEventClientDisplayMode']
    },
];
let hide2 = [
    {
        name: ['Recoil', 'Immolation', 'EMPRocket'],
        headers: ['ActivationPrep', 'ActivationDelay', 'DisableTime']
    },
    {
        name: ['ShipmentDrone'],
        headers: ['SpawnLifetime_WS']
    }
];
let fixValue = [
    {
        header: ["Battery"],
        func: (v) => 'TID_MODULE_BATTERY'
    },
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
let whiteListBS = {
    checkList(header, name) {
        for (let d of this.data) {
            let whiteHeaders = d.headers;
            let whiteNames = d.names;
            if (whiteHeaders.includes(header)) {
                if (whiteNames.includes(name)) {
                    return true;
                } else {
                    return false;
                };
            };
        }
        return true;
    },
    data:
        [
            {
                headers: ["ActivationPrep"],
                names: ["Vengeance"]
            },
            {
                headers: ["ActivationDelay", "MaxDPSTime", "APTPIOTTP"],
                names: [''] // нужны только БЗ статы
            }
        ]
}
module.exports = { hide, hide2, fixValue, whiteListBS };
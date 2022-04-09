// noinspection SpellCheckingInspection

import sec2str from '@Scripts/sec2str.js';
import locKeys from '@Regulation/locKeys.js';

export default [
    [
        ['JobPayoutIncreasePercent',
            'DamageReductionPct',
            'TradeStationDeliverReward',
            'DroneShipmentBonus',
            'TradeBurstShipmentBonus',
            'MirrorDamagePct',
            'WaypointShipmentRewardBonus',
            'UnityBoostPercent',
            'IncreaseSectorHydroPct',
            'HydroUploadPct',
            'SpeedIncreasePerShipment',
            'SalvageHullPercent',
            'IncreaseSectorHydroPct',
            'CreditIncomeModifier',
            'FuelIncomeModifier',
            'CreditStorageModifier',
            'FuelStorageModifier',
            'CreditShipmentModifier',
            'FuelShipmentModifier',
            'CancelBuildRefundPct',
            'ArtifactYieldBonus',
            'BlueStar_CRRewardRate',
            'BlueStar_MaxHydroPerDayPct',
            'DroneShipmentBonusMax',
            'SpeedIncrDuringActivation',
            'TimeWarpSuppression'],
        (v) => `${v}%`,
    ],
    [
        ['UnlockTime',
            'SpawnLifetime',
            'ActivationDelay',
            'ActivationPrep',
            'RedStarLifeExtention',
            'TimeToFullyRegen',
            'ShieldRegenDelay',
            'EffectDurationx10',
            'DesignUpgradeTime',
            'MaxDPSTime',
            'DockedObjectDestroyTime',
            'DisableTime',
            'SectorUnlockTime',
            'TimeToUpgrade',
            'TimeToResearch',
            'TimeToLoad',
            'Lifetime',
            'ConstructionTime',
            'TeleportShipmentsDurationHr',
            'TimeSpeedupMaxSeconds',
            'TimeSpeedupRegenPerDay',
            'SpawnDelay',
            'MoveUpdateSec',
            'BlueStar_CRRewardWinLimitPeriod',
            'WSLostBSTimeCooldown',
            'WSLostOtherTimeCooldown',
            'WSJumpBSTimeCooldown',
            'WSJumpOtherTimeCooldown',
            'ProximityTriggerSec',
            'EMPResist',
            'DestinyDisableTimes',
            'SpawnFleetIntervalSeconds',
            'ShieldRegenTimeAfterDamage',
            'SectorEnrichCooldownSeconds',
            'TurretSetupTime',
            'TurretSetupTime_WS',
            'TurretSetupTimeBS',
            'RelicLoad'],
        (v, opts) => sec2str(opts.$t, v),
    ],
    [
        ['APTPIOTTP'],
        (v, opts) => sec2str(opts.$t, v / 5),
    ],
    [
        ['BlueStar_HydroPctPerPos'],
        (v) => `${v / 10}%`,
    ],
    [
        ['EffectRadius',
            'DamageRange',
            'DamageRangeWhenNeutralized',
            'AttackRange'],
        (v, { $t }) => `${v} ${$t('AU')}`,
    ],
    [
        ['UnlockBlueprints',
            'UnlockPrice',
            'BCCost',
            'BuildCost',
            'DesignUpgradeCost',
            'HP',
            'WhiteStarScore',
            'BSScore',
            'ActivationFuelCost',
            'AOEDamage',
            'Damage',
            'Cost',
            'HydrogenPerDay',
            'CreditStorage',
            'FuelStorage',
            'ShipmentsCRValuePerDay',
            'array',
            'SalvageCRReward',
            'PriceInCrystals',
            'XP',
            'SalvageHydroReward',
            'SectorUnlockCost',
            'TotalShipmentCRPerDay',
            'GoalTarget',
            'CRReward',
            'FuelReward',
            'UnlockAmount',
            'PCReward',
            'XPReward',
            'RelicsRequired',
            'Score1Thresholds',
            'Score2Thresholds',
            'Score3Thresholds',
            'CRAsteroidAmt',
            'MaxHP',
            'MaxShield',
            'ShieldStrength'],
        (v) => v.toLocaleString(),
    ],
    [
        ['MoveHydrogenCostPerSector', 'TSHydroCost'],
        (v, { $t }) => `${v.toLocaleString()} ${$t('HYD')}.`,
    ],
    [
        ['MiningSpeed'],
        (v, { $t }) => `${v}/${$t('min')}`,
    ],
    [
        ['FuelUseIncrease', 'FuelUsePer5000Distance'],
        (v, { $t }) => `${v / 5}/100${$t('AU')}`,
    ],
    [
        ['TimeSlowdownFactor'],
        (v) => `x${v}`,
    ],
    [
        ['TimeWarpFactor', 'MiningSpeedModifierPct'],
        (v) => `x${v / 100}`,
    ],
    [
        ['TimeSpeedupFactor'],
        (v) => `x${v / 10000}`,
    ],
    [
        ['TID',
            'TID_Description',
            'BaseType',
            'TID_Artifact',
            'InitialModule'],
        (v, { $t }) => $t(v),
    ],
    [
        // ['Model'],
        [''],
        (v, opts) => {
            const src = require(`@Img/${opts.iconDir}/${v}.png`);
            return `<img class="ships" src="${src}" alt="${v}">`;
        },

    ],
    [
        ['PlanetTypes', 'Name'],
        (v, { $t }) => {
            return v
                .split('!')
                .filter((e) => e !== ' ')
                .map((e) => {
                    const elem = e.split('_');
                    if (elem.length === 1) return elem[0];
                    return `${$t(elem[0])} ${$t('LVL')}. ${elem[1].slice(-1)}`;
                })
                .join(', ');
        },
    ],
    [
        ['NewModuleSlots'],
        (v, { $t }) => {
            return v
                .split('!')
                .map((e) => $t(locKeys[e] || e))
                .join(', ');
        },
    ],
    [
        ['GhostSpawnSecs'],
        (v, opts) => {
            return v
                .split('!')
                .map((e) => sec2str(opts.$t, e))
                .join(', ');
        },
    ],
    [
        ['StringParam', 'ShipToSpawn'],
        (v, { $t }) => $t(v.replace(/Cerberus(.*)/, '$1')),
    ],
    [
        ['module'],
        (v, { $t }) => {
            const arr = v.split('!');
            return `${$t(arr[0])} ${arr[1]}`;
        },
    ],
    [
        ['UnityMaxDamageIncreasePct'],
        (v) => `+${v}%`,
    ],
    [
        ['PassiveIncomeModifier'],
        (v) => `+${v - 100}%`,
    ],
    [
        ['Hydrogen',
            'Credits',
            'RegularInfuenceRange',
            'InfluenceAwardThreshold',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11'],
        (v) => {
            const arr = String(v)
                .split('!')
                .map((e) => {
                    if (e !== ' ') {
                        return Number(e).toLocaleString();
                    } else {
                        return null;
                    }
                });
            return `${arr[0] || ''}-${arr[1] || ''}`;
        },
    ],
    [
        ['TicksPerRelic'],
        (v, opts) => sec2str(opts.$t, v * 120),
    ],
    [
        ['TargetSwitchTicks'],
        (v, opts) => sec2str(opts.$t, v / 5),
    ],
    [
        ['PreparationTimeHours'],
        (v, { $t }) => `${v} ${ $t('HOURS')}`,
    ],
    [
        ['HealRate'],
        (v) => v / 200,
    ],
    [
        ['Speed'],
        (v, { $t }) => `${v * 6} ${$t('AU')}`,
    ],
    // [
    //     ['ActivationPrepWS', 'SpawnLifetime_WS', 'TurretSetupTime_WS'],
    //     (v) => v * 3600 / 6,
    // ],
    // [
    //     ['EffectRadiusWS',
    //         'EffectRadiusBS',
    //         'EffectRadius',
    //         'DamageRange',
    //         'DamageRangeWhenNeutralized',
    //         'ShipmentsPerHour',
    //         'EffectDurationx10',
    //         'EffectDurationx10BS',
    //         'RadiusMax',
    //         'AttackRange'],
    //     (v) => v / 10,
    // ],
];

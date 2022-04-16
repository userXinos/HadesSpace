// noinspection SpellCheckingInspection

import Icon from '@/components/Icon.vue';
import sec2str from '@Scripts/sec2str.js';
import locKeys from '@Regulation/locKeys.js';

const numberFormat = new Intl.NumberFormat('ru-RU').format;

export default [
    [
        [
            'TimeWarpSuppression',
            'JobPayoutIncreasePercent',
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
            'TimeWarpSuppression',
            'UnityMaxDamageIncreasePct',
            'BlueStar_SPFactor',
        ],
        (v) => `${v}%`,
    ],
    [
        [
            'UnlockTime',
            'SpawnLifetime',
            'ActivationDelay',
            'ActivationPrep',
            'RedStarLifeExtention',
            'TimeToFullyRegen',
            'ShieldRegenDelay',
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
            'RelicLoad',
            'RSPublicLateJoin_TimeAvailable',
        ],
        (v, opts) => sec2str(opts.$t, v),
    ],
    [
        [
            'DeactivateOnJump',
            'PreventUseOnWsJumpgate',
            'StopCountdownOnDisable',
            'IsAreaShield',
            'BSOnly',
            'IsStealth',
            'DisableActivationDuringPrep',
            'DestinyBreaksBond',
            'BondOverridesBarrier',
            'IgnoreBarrier',
            'LeapBreaksBond',
            'BondBreaksBond',
            'PubRSEMPReqEnemies',
            'ApplyAOEDamageOnDestroy',
            'RequiresEmptySector',
            'CanCancelBuild',
            'AllowMoveInSameSectorOnly',
            'BuyInPairs',
            'RequiresStarSector',
            'SafeInterceptorInPublicRS',
            'NoCerbBondTeleportP', // так надо
        ],
        (v, { $t }) => v ? $t('YES') : $t('NO'),
    ],
    [
        [
            'EffectRadius',
            'DamageRange',
            'DamageRangeWhenNeutralized',
            'AttackRange',
            'CollapseAreaSize',
        ],
        (v, { $t }) => `${v / 10} ${$t('AU')}`,
    ],
    [
        ['APTPIOTTP'],
        (v, opts) => sec2str(opts.$t, v / 5),
    ],
    [
        ['EffectDurationx10'],
        (v, opts) => sec2str(opts.$t, v / 5),
    ],
    [
        ['BlueStar_HydroPctPerPos'],
        (v) => `${v / 10}%`,
    ],
    [
        ['MoveHydrogenCostPerSector', 'TSHydroCost'],
        (v, { $t }) => `${numberFormat(v)} ${$t('HYD')}.`,
    ],
    [
        ['SecurityRating'],
        (v, { $t }) => $t(`TID_SECURITY_RATING_${v}`),
    ],
    [
        ['BSAnomaly'],
        (v) => v ? '✓' : '',
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
        ['TID', 'TID2', 'TID_Description', 'TID_Artifact'],
        (v, { $t }) => $t(v),
    ],
    [
        ['BaseType'],
        (v, { $t }) => v ? `${v.NumBases} ${$t(v.TID)}` : '',
    ],
    [
        ['MiningPeriod'],
        (v, { $t }) => `${(60 * (100 / v)).toFixed(1)}/${$t('TID_MINUTE_ABBREVIATION')}`,
    ],
    [
        ['GhostSpawnSecs'],
        (v, opts) => v.map((e) => sec2str(opts.$t, e)).join(', '),
    ],
    [
        ['InitialModule', 'ShipToSpawn', 'Name'],
        (v, { $t }) => $t(locKeys[v] || v),
    ],
    [
        ['PassiveIncomeModifier'],
        (v) => `+${v - 100}%`,
    ],
    [
        ['TicksPerRelic', 'ExtraAsteroidSpawnTick'],
        (v, opts) => sec2str(opts.$t, v * 120),
    ],
    [
        ['TargetSwitchTicks', 'CycleTicks'],
        (v, opts) => sec2str(opts.$t, v / 5),
    ],
    [
        ['PreparationTimeHours'],
        (v, { $t }) => `${v} ${ $t('TID_HOUR_ABBREVIATION')}`,
    ],
    [
        ['HealRate'],
        (v) => v / 200,
    ],
    [
        ['Speed'],
        (v, { $t }) => `${v * 6} ${$t('AU')}/${$t('TID_MINUTE_ABBREVIATION')}`,
    ],
    [
        ['MinScannerLevel'],
        (v) => v + 1,
    ],
    [
        ['SlotsUsed'],
        (v, { $t }) => $t('TID_TRADE_DLG_ITEM_WEIGHT', [v]),
    ],
    [
        ['*'],
        (v) => (v.length) ? v.join('-') : '',
        ['CombatBlueprints', 'UtilityBlueprints', 'SupportBlueprints'],
    ],
    [
        ['Thresholds'],
        (v) => v.map(numberFormat).join(' -> '),
    ],
    [
        ['CerbGroup'],
        (v, { $t }) => (v === null) ? '' : Object.entries(v)
            .filter(([k]) => k !== 'Name') //                          NumCERBER_NAMEs
            .map(([k, v]) => `${$t(locKeys[k.replace(/^Num(.+?)s?$/, '$1')])}: ${v}`)
            .join(', '),
    ],
    [
        ['Model'],
        (v) => (createElement) => createElement(Icon, {
            name: v,
            dir: 'game/Ships',
        }),
    ],
    [
        ['PlanetTypes'],
        (v, { $t }) => {
            return (Array.isArray(v) ? v : [v])
                .filter((e) => e !== null)
                .map((e) => {
                    const [name, lvl] = e.split('_');
                    if (!lvl) return name;
                    return `${$t(locKeys[name])} ${$t('LVL')}. ${lvl.slice(-1)}`;
                })
                .join(', ');
        },
    ],
    [
        ['NewModuleSlots'],
        (v, { $t }) => {
            return (Array.isArray(v) ? v : [v])
                .map((e) => $t(locKeys[e] || e))
                .join(', ');
        },
    ],
    [
        ['module'],
        (v, { $t }) => {
            const arr = v.split('!');
            return `${$t(arr[0])} ${arr[1]}`;
        },
    ],
    [
        [
            'Influence',
            'RegularInfuenceRange',
            'InfluenceAwardThreshold',
            'Credits',
            'Hydrogen',
            'RSLevel',
        ],
        (v) => v ? (
            Array.isArray(v) ? v
                .filter((e) => e)
                .map(numberFormat)
                .join('-') : v
        ) : '',
    ],
];

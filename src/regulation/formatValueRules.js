// noinspection SpellCheckingInspection

import i18n from '@/js/Vue/i18n';
import Icon from '@/components/Icon.vue';
import sec2str from '@/js/sec2str';

import locKeys from '@Regulation/locKeys.mjs';
import formatValueRulesTime from '@Regulation/formatValueRulesTime.mjs';
import globals from '@Data/globals.js';
import stars from '@Data/stars.js';

const { t } = i18n.global;
const numberFormat = new Intl.NumberFormat('ru-RU').format;

const isNebulaBuild = !!process.env.VUE_APP_NEBULA_BUILD;

export default [

    ...formatValueRulesTime.map(([keys, formatter]) => [keys, (v) => sec2str(formatter(v, globals))]),

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
            'SpeedIncreasePerShipment', // устарело
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
            'MaxRelicSpeedIncrease',
            'ArtifactBoostPct',
            'HydroClonePct',
            'LinkDPSBoostPct',
            'SolitudeDPSBoost',
            'DmgReduceImmobilize',
            'SpeedSlowdownFactor',
            'SpeedModifierPct',
            'MirrorDamageAsAOE',
            'DRSArtifactBonus',
            'MassMiningRatePct',
        ],
        (v) => `${v}%`,
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
            'ShowDurationInTopSpot',
            'NoCerbBondTeleportP', // так надо
            'DronesIgnoreBarrier',
        ],
        (v) => v ? t('YES') : t('NO'),
    ],
    [
        [
            'EffectRadius',
            'DamageRange',
            'DamageRangeWhenNeutralized',
            'AttackRange',
            'CollapseAreaSize',
            'LinkWeaponRange',
            'ImpulseRange',
            'AdditionalRangesPerLink',
            'WSDispatchAOERange',
            'LeapAOERange',
        ],
        (v) => `${v / 10} ${t('AU')}`,
    ],
    [
        ['BlueStar_HydroPctPerPos'],
        (v) => `${v / (isNebulaBuild ? 100 : 10)}%`,
    ],
    [
        ['BlueStar_CreditPctPerPos'],
        (v) => `${v / 2}%`,
    ],
    [
        ['MoveHydrogenCostPerSector', 'TSHydroCost', 'ActivationFuelCost'],
        (v) => `${numberFormat(v)} ${t('HYD')}.`,
    ],
    [
        ['SpeedIncreasePerShipment'],
        (v) => t('TID_MODULE_RUSH_SPEED_INCR_VAL_PER_SHIPMENT', [v]),
    ],
    [
        ['SpeedIncreasePerArtifact'],
        (v) => t('TID_MODULE_RUSH_SPEED_INCR_VAL_PER_SHIPMENT_RS', [v]),
    ],
    [
        ['SpeedIncreasePerRelic'],
        (v) => t('TID_MODULE_RUSH_SPEED_INCR_VAL_PER_SHIPMENT_WS', [v]),
    ],
    [
        ['SecurityRating'],
        (v) => t(`TID_SECURITY_RATING_${v}`),
    ],
    [
        ['BSAnomaly', 'DSAnomaly'],
        (v) => v ? '✓' : '',
    ],
    [
        ['FuelUseIncrease', 'FuelUsePer5000Distance'],
        (v) => `${v / 5}/100${t('AU')}`,
    ],
    [
        ['TimeSlowdownFactor'],
        (v) => `x${v}`,
    ],
    [
        ['TimeWarpFactor', 'MiningSpeedModifierPct', 'DamageAmplifyFactor'],
        (v) => `x${v / 100}`,
    ],
    [
        ['TimeSpeedupFactor'],
        (v) => `x${v / 10000}`,
    ],
    [
        ['TID', 'TID2', 'TID_Description', 'TID_Artifact', 'TID_Description_BLS'],
        (v) => t(v),
    ],
    [
        ['BaseType'],
        (v) => v ? `${v.NumBases} ${t(v.TID)}` : '',
    ],
    [
        ['MiningPeriod'],
        (v) => `${(60 * (100 / v)).toFixed(1)}/${t('TID_MINUTE_ABBREVIATION')}`,
    ],
    [
        ['GhostSpawnSecs'],
        (v) => v.map((e) => sec2str(e)).join(', '),
    ],
    [
        ['InitialModule', 'ShipToSpawn', 'Name'],
        (v) => t(locKeys[v] || v),
    ],
    [
        ['PassiveIncomeModifier'],
        (v) => `+${v - 100}%`,
    ],
    [
        ['TicksPerRelic', 'ExtraAsteroidSpawnTick'],
        (v) => sec2str(v * 120),
    ],
    [
        ['PreparationTimeHours', 'TeleportShipmentsDurationHr'],
        (v) => `${v} ${ t('TID_HOUR_ABBREVIATION')}`,
    ],
    [
        ['HealRate'],
        (v) => v / 200,
    ],
    [
        ['Speed'],
        (v) => `${v * 6} ${t('AU')}/${t('TID_MINUTE_ABBREVIATION')}`,
    ],
    [
        ['MinScannerLevel'],
        (v) => v + 1,
    ],
    [
        ['SlotsUsed'],
        (v) => t('TID_TRADE_DLG_ITEM_WEIGHT', [v]),
    ],
    [
        ['*'],
        (v) => (v.length) ? v.join('-') : '',
        ['CombatBlueprints', 'UtilityBlueprints', 'SupportBlueprints'],
    ],
    [
        ['RS', 'WS', 'BS'],
        (v) => `${v}%`,
        ['Salvage'],
    ],
    [
        ['Thresholds'],
        (v) => v.map(numberFormat).join(' -> '),
    ],
    [
        [isNebulaBuild ? '' : 'DestinyDisableTimes'],
        ([rs, ws]) => `${t('RS')}: ${sec2str(rs)} | ${t('WS')}: ${sec2str(ws * stars.WhiteStar.TimeSlowdownFactor)}`,
    ],
    [
        [isNebulaBuild ? '' : 'BarrageMaxAdditionalEnemies'],
        ([rs, ws]) => `${t('RS')}: ${rs} | ${t('WS')}: ${ws}`,
    ],
    [
        ['SalvageHullPercent'],
        ([rs, ws]) => `${t('RS')}: ${rs}% / ${t('WS')}: ${ws}%`,
    ],
    [
        ['ActivationType'],
        (v) => v === 'Passive' ? t('TID_MODULE_TYPE_PASSIVE') : (v === 'Activated' ? t('TID_MODULE_TYPE_ACTIVATED') : v),
    ],
    [
        ['CerbGroup'],
        (v) => (v === null) ? '' : Object.entries(v)
            .filter(([k]) => k !== 'Name') //                          NumCERBER_NAMEs
            .map(([k, v]) => `${t(locKeys[k.replace(/^Num(.+?)s?$/, '$1')])}: ${v}`)
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
        ['ConceptImage'],
        (v) => (createElement) => createElement('a', {
            href: require(`@Img/game/portraits/${v}.png`),
            target: '_blank',
        }, t('OPEN')),
    ],
    [
        ['PlanetTypes'],
        (v) => {
            return (Array.isArray(v) ? v : [v])
                .filter((e) => e !== null)
                .map((e) => {
                    const [name, lvl] = e.split('_');
                    if (!lvl) return name;
                    return `${t(locKeys[name])} ${t('LVL')}. ${lvl.slice(-1)}`;
                })
                .join(', ');
        },
    ],
    [
        ['NewModuleSlots'],
        (v) => {
            return (Array.isArray(v) ? v : [v])
                .map((e) => t(locKeys[e] || e))
                .join(', ');
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
        formatMixMax,
    ],
    [
        ['valueZ'],
        formatMixMax,
        ['EntrustArtifacts'],
    ],
    [
        ['valueX'],
        (v) => t(locKeys[v.replace(/^Cerberus(.+?)s?$/, '$1')]),
        ['DestroySentinels', 'DestroyGuardians', 'DestroyColossus', 'DestroyInterceptor', 'DestroyPhoenix'],
    ],
];

function formatMixMax(v) {
    if (!v) return '';
    if (!Array.isArray(v)) return v;

    return v.filter((e) => e).map(numberFormat).join('-');
}

// noinspection SpellCheckingInspection

import i18n from '@Utils/Vue/i18n';
import store from '@Store/index';
import Icon from '@/components/Icon.vue';
import sec2str from '@Utils/sec2str';

import locKeys from '@Regulation/locKeys.mjs';
import formatValueRulesTime from '@Regulation/formatValueRulesTime.mjs';
import globals from '@Data/globals.js';
import stars from '@Data/stars.js';
import planets from '@Data/planets.js';

const { t } = i18n.global;
const numberFormat = new Intl.NumberFormat('ru-RU').format;

const isNebulaBuild = !!process.env.VUE_APP_NEBULA_BUILD;

export default [

    ...formatValueRulesTime.map(([keys, formatter]) => [
        keys,
        (v) => Array.isArray(v) ? v.map((e) => sec2str(formatter(e, globals))).join(', ') : sec2str(formatter(v, globals)),
    ]),

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
            'LinkDPSBoostPct',
            'SpeedModifierPct',
            'MirrorDamageAsAOE',
            'DRSArtifactBonus',
            'MassMiningRatePct',
            'RelayBonusPct',
            'RushRSSpeedIncr',
            'RushYSHydroDc',
            'RushRSHydroDc',
            'BaseArtifactYieldBonus',
            'MaxArtifactYieldBonus',
        ],
        (v) => `${v}%`,
    ],
    [
        [
            'AllowAdditionalBuildingsAtMaxLevel',
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
            'SafeInterceptorInPublic',
            'ShowDurationInTopSpot',
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
            'RadialMoveRadius',
            'RadiusMax',
            'MinEffectRadius',
        ],
        (v) => `${v / 10} ${t('AU')}`,
    ],
    [
        ['BlueStar_HydroPctPerPos'],
        (v) => `${v / 10}%`,
    ],
    [
        ['ImpulseSpeedup'],
        (v) => `${v / 10}x`,
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
        ['RushWSSpeedIncrPR'],
        (v) => t('TID_MODULE_RUSH_SPEED_INCR_VAL_PER_SHIPMENT_WS', [v]),
    ],
    [
        ['SecurityRating'],
        (v) => {
            if (isNebulaBuild) {
                return t(`TID_SECURITY_RATING_${['S', 'PS', 'NS'][v]}`);
            }
            return t(`TID_SECURITY_RATING_${v}`);
        },
    ],
    [
        ['BSAnomaly'],
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
        ['TimeWarpFactor', 'MiningSpeedModifierPct'],
        (v) => `x${v / 100}`,
    ],
    [
        ['TimeSpeedupFactor'],
        (v) => `x${v / 10000}`,
    ],
    [
        ['TID', 'TID2', 'TID_Description', 'TID_Artifact', 'DNDiff'],
        (v) => !Array.isArray(v) ? t(v) : undefined,
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
        ['OnBoardHydroMax'],
        (v) => `${(v / 30).toFixed(1)}/${t('TID_SECOND_ABBREVIATION')}`,
    ],
    [
        ['InitialModule', 'Name'],
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
        (v) => Object.entries(v)
            .filter(([k]) => k !== 'Name') //                          NumCERBER_NAMEs
            .map(([k, v]) => `${t(locKeys[k.replace(/^Num(.+?)s?$/, '$1')] || k)}: ${v}`)
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
        ['*'],
        (modules) => (createElement) => modules == null ? null : (
            createElement('div', null,
                modules.map((mod) => (
                    createElement('a', { href: `/${mod.SlotType}#${mod.Name}` },
                        createElement(Icon, { name: mod.Icon, dir: 'game/Modules' }),
                        store.state.userSettings.compactModulesByArtTypeTable ? null : createElement('p', null, t(mod.TID)),
                    )
                )),
            )
        ),
        ['modulesByArtType'],
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
            const getName = (k) => (k in planets) ? t(planets[k].TID) : k;
            if (Array.isArray(v)) {
                return v.map((e) => getName(e)).join(', ');
            }
            return getName(v);
        },
    ],
    [
        ['CreditsPerHour', 'FuelPerHour'],
        (v) => t('TID_INFO_VALUE_PER_HR', [v]),
    ],
    [
        ['ShipmentsCRValuePerDay', 'TotalShipmentCRPerDay'],
        (v) => t('TID_INFO_VALUE_PER_DAY', [numberFormat(v)]),
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
        ['Transport', 'Miner', 'Battleship'],
        (v) => (Array.isArray(v)) ? v.join('>') : v,
        ['RedStar', 'DarkRedStar'],
    ],
];

function formatMixMax(v) {
    if (!v) return '';
    if (!Array.isArray(v)) return v;

    return v.filter((e) => e).map(numberFormat).join('-');
}

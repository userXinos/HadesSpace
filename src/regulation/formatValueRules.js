// noinspection SpellCheckingInspection

import { RouterLink } from 'vue-router';
import i18n from '@Utils/Vue/i18n';
import store from '@Store/index';
import Icon from '@/components/Icon.vue';
import sec2str from '@Utils/sec2str';

import locKeys from '@Regulation/locKeys.mjs';
import formatValueRulesTime from '@Regulation/formatValueRulesTime.mjs';
import globals from '@Data/globals.js';
import planets from '@Data/planets.js';

const { t } = i18n.global;
const numberFormat = new Intl.NumberFormat('ru-RU').format;

export default [

    ...formatValueRulesTime.map(([keys, formatter]) => [
        keys,
        (v) => Array.isArray(v) ? v.map((e) => sec2str(formatter(e, globals))).join(', ') : sec2str(formatter(v, globals)),
    ]),

    [
        [
            'TradeBurstShipmentBonus',
            'WaypointShipmentRewardBonus',
            'IncreaseSectorHydroPct',
            'HydroUploadPct',
            'CreditIncomeModifier',
            'FuelIncomeModifier',
            'CreditStorageModifier',
            'FuelStorageModifier',
            'CreditShipmentModifier',
            'FuelShipmentModifier',
            'CancelBuildRefundPct',
            'BlueStar_MaxHydroPerDayPct',
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
            'DroneDeliveryBonus',
            'HydroDeliveryBonus',
            'MotionShieldPct',
            'SolitudeDPSBoost',
            'FortifyDamageAmpFactor',
            'HydroCostModifierPct',
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
            'BondOverridesBarrier',
            'IgnoreBarrier',
            'LeapBreaksBond',
            'BondBreaksBond',
            'ApplyAOEDamageOnDestroy',
            'RequiresEmptySector',
            'CanCancelBuild',
            'AllowMoveInSameSectorOnly',
            'BuyInPairs',
            'RequiresStarSector',
            'ShowDurationInTopSpot',
            'DronesIgnoreBarrier',
            'ReqUniqueCargo',
        ],
        (v) => v ? t('YES') : t('NO'),
    ],
    [
        [
            'EffectRadius',
            'DamageRange',
            'DamageRangeWhenNeutralized',
            'AttackRange',
            'LinkWeaponRange',
            'ImpulseRange',
            'AdditionalRangesPerLink',
            'WSDispatchAOERange',
            'LeapAOERange',
            'RadialMoveRadius',
            'MinEffectRadius',
            'BlastDroneDamageRange',
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
        ['MoveHydrogenCostPerSector'],
        (v) => `${numberFormat(v)} ${t('HYD')}.`,
    ],
    [
        ['RushWSSpeedIncrPR'],
        (v) => t('TID_MODULE_RUSH_SPEED_INCR_VAL_PER_SHIPMENT_WS', [v]),
    ],
    [
        ['SecurityRating'],
        (v) => {
            return t(`TID_SECURITY_RATING_${['S', 'PS', 'NS'][v]}`);
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
        ['MovementSlowdown', 'DamageReduceFactor'],
        (v) => `${100 - v}%`,
    ],
    [
        ['MiningSpeedModifierPct', 'DamageAmplifyFactor'],
        (v) => `x${v / 100}`,
    ],
    [
        ['TID', 'TID2', 'TID_Description', 'DNDiff'],
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
        ['PreparationTimeHours'],
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
                    createElement(RouterLink, { to: `${process.env.BASE_URL}${mod.SlotType}#${mod.Name}` },
                        createElement(Icon, { name: mod.Icon, dir: 'game/Modules' }),
                        store.state.userSettings.compactModulesByArtTypeTable ? null : createElement('p', null, t(mod.TID)),
                    )
                )),
            )
        ),
        ['ModulesByArtType'],
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

'use strict';

import secToStringTime from './secToStringTime';
import stringKeys from '../stringKeys';

export default function($t, $te, iconDir, key, value) {
  const fixTime = (...args) => secToStringTime(getStr, ...args);
  const getStr = (key) => {
    if (key in stringKeys) key = stringKeys[key];
    return $t(key);
  };
  const funcs = {
    addPercent: (v) => v + '%',
    fixTime: (v) => fixTime(v),
    addAU: (v) => v + ' ' + getStr('AU'),
    toLocaleString: (v) => v.toLocaleString(),
    addHyd: (v) => `${v.toLocaleString()} ${getStr('hyd')}.`,
    addMin: (v) => v + '/' + getStr('min'),
    add100AU: (v) => v + '/100' + getStr('AU'),
    addX: (v) => 'x' + v,
    addSec: (v) => v + ' ' + getStr('sec'),
    getStr: (v) => getStr(v),
    shipsModel: (v) => {
      const src = require(`../../img/${iconDir}/${v}.png`);
      return `<img class="ships" src="${src}" alt="${v}">`;
    },
    splitExclamationMark: (v) => {
      const result = [];
      const items = v.split('!');
      for (let item of items) {
        if (item == ' ') return ' ';
        item = item.split('_');
        if (item.length == 1) item.push(item[0]);
        result.push(`${getStr(item[0])} ${getStr('lvl')}. ${item[1].slice(-1)}`);
      }
      return result.join(', ');
    },
    newModuleSlots: (v) => {
      return v
          .split('!')
          .map((e) => '+ ' + getStr(e))
          .join(', ');
    },
    splitGhosts: (v) => {
      return v
          .split('!')
          .map((e) => fixTime(e))
          .join(', ');
    },
    replanceCerberus: (v) => getStr(v.replace(/Cerberus(.*)/, '$1')),
    splitModule: (v) => {
      const arr = v.split('!');
      return `${getStr(arr[0])} ${arr[1]}`;
    },
    addPercentPlus: (v) => `+${v}%`,
    slitPushedValues: (v) => {
      let arr = v.split('!');
      arr = arr.map((e) => {
        if (e != ' ') {
          return Number(e).toLocaleString();
        } else {
          return null;
        }
      });
      return `${arr[0] || ''}-${arr[1] || ''}`;
    },
    fixTimeTickHour: (v) => fixTime(v * 120),
    fixTimeTickSec: (v) => fixTime(v / 5),
    addHours: (v) => v + ' ' + getStr('hours'),
  };

  if (key == undefined || value == undefined) {
    console.log(`Ошибка в ${key} : ${value}`);
    return;
  }
  if (value.constructor == Object) {
    const r = [];
    Object.keys(value).forEach((i) => {
      r.push(`${getStr(i)}: ${value[i]}`);
    });
    return r.join(', ');
  }

  const type = getType(key);
  if (type) {
    return funcs[type](value);
  } else {
    return value;
  }
}

function getType(header) {
  const data = {
    addPercent: [
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
      'BlueStar_HydroPctPerPos',
      'DroneShipmentBonusMax',
      'SalvageHullPercentWS',
      'SalvageHullPercentBS',
      'SpeedIncrDuringActivation',
    ],
    fixTime: [
      'UnlockTime',
      'SpawnLifetime',
      'ActivationDelay',
      'ActivationPrep',
      'ActivationPrepBS',
      'RedStarLifeExtention',
      'TimeToFullyRegen',
      'ShieldRegenDelay',
      'EffectDurationx10',
      'EffectDurationx10WS',
      'EffectDurationx10BS',
      'ActivationPrepWS',
      'SpawnLifetime_WS',
      'DesignUpgradeTime',
      'ActivationDelayWS',
      'ActivationDelayBS',
      'MaxDPSTime_BS',
      'MaxDPSTimeWS',
      'MaxDPSTime',
      'APTPIOTTPWS',
      'DockedObjectDestroyTime',
      'DisableTimeWS',
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
      'ProximityTriggerSecWS',
      'DestinyDisableTimes',
      'DestinyDisableTimesWS',
      'SpawnFleetIntervalSeconds',
      'ShieldRegenTimeAfterDamage',
      'SectorEnrichCooldownSeconds',
      'RelicLoad',
      'RelicLoadWS',
      'ProximityTriggerSecBS',
      'ActivationPrepRS',
      'SpawnLifetime_BS',
      'SpawnLifetimeBS',
      'ActivationDelayWS',
      'ActivationDelayRS',
      'MaxDPSTimeBS',
      'ProximityTriggerSecBS',
      'ProximityTriggerSecRS',
    ],
    addAU: [
      'EffectRadiusWS',
      'EffectRadiusBS',
      'EffectRadius',
      'DamageRange',
      'DamageRangeWhenNeutralized',
      'Speed',
      'AttackRange',
    ],
    toLocaleString: [
      'UnlockBlueprints',
      'UnlockPrice',
      'BCCost',
      'BuildCost',
      'DesignUpgradeCost',
      'HP',
      'WhiteStarScore',
      'BSScore',
      'ActivationFuelCost',
      'AOEDamage',
      'AOEDamage_WS',
      'AOEDamage_BS',
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
      'ShieldStrength',
    ],
    addHyd: ['MoveHydrogenCostPerSector', 'TSHydroCost'],
    addMin: ['MiningSpeed'],
    add100AU: ['FuelUseIncrease', 'FuelUsePer5000Distance'],
    addX: [
      'TimeWarpFactor',
      'TimeSpeedupFactor',
      'TimeSlowdownFactor',
      'MiningSpeedModifierPct',
    ],
    addSec: ['APTPIOTTP'],
    getStr: [
      'TID',
      'TID_Description',
      'BaseType',
      'TID_Artifact',
      'InitialModule',
    ],
    shipsModel: ['Model'],
    splitExclamationMark: ['PlanetTypes', 'Name'],
    newModuleSlots: ['NewModuleSlots'],
    splitGhosts: ['GhostSpawnSecs'],
    replanceCerberus: ['StringParam', 'ShipToSpawn'],
    splitModule: ['module'],
    addPercentPlus: ['PassiveIncomeModifier', 'UnityMaxDamageIncreasePct'],
    slitPushedValues: [
      'Hydrogen',
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
      '11',
    ],
    fixTimeTickHour: ['TicksPerRelic'],
    fixTimeTickSec: ['TargetSwitchTicks'],
    addHours: ['PreparationTimeHours'],
  };
  for (const key in data) {
    if (data[key].includes(header)) {
      return key;
    }
  }
  return null;
}

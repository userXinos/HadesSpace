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
      'BlueStar_HydroPctPerPos',
      'DroneShipmentBonusMax',
      'SpeedIncrDuringActivation',
      'TimeWarpSuppression'],
    (v) => v + '%',
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
      'APTPIOTTP',
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
    (v, o) => o.fixTime(v),
  ],
  [
    ['EffectRadius',
      'DamageRange',
      'DamageRangeWhenNeutralized',
      'Speed',
      'AttackRange'],
    (v, o) => v + ' ' + o.getStr('AU'),
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
    (v, o) => `${v.toLocaleString()} ${o.getStr('hyd')}.`,
  ],
  [
    ['MiningSpeed'],
    (v, o) => v + '/' + o.getStr('min'),
  ],
  [
    ['FuelUseIncrease', 'FuelUsePer5000Distance'],
    (v, o) => v + '/100' + o.getStr('AU'),
  ],
  [
    ['TimeWarpFactor',
      'TimeSpeedupFactor',
      'TimeSlowdownFactor',
      'MiningSpeedModifierPct'],
    (v) => 'x' + v,
  ],
  [
    ['TID',
      'TID_Description',
      'BaseType',
      'TID_Artifact',
      'InitialModule'],
    (v, o) => o.getStr(v, o),
  ],
  [
    ['Model'],
    (v, o) => {
      const src = require(`../../../frontend/src/img/${o.iconDir}/${v}.png`);
      return `<img class="ships" src="${src}" alt="${v}">`;
    },

  ],
  [
    ['PlanetTypes', 'Name'],
    (v, o) => {
      return v
          .split('!')
          .filter((e) => e !== ' ')
          .map((e) => {
            const elem = e.split('_');
            if (elem.length === 1) return elem[0];
            return `${o.getStr(elem[0])} ${o.getStr('lvl')}. ${elem[1].slice(-1)}`;
          })
          .join(', ');
    },
  ],
  [
    ['NewModuleSlots'],
    (v, o) => {
      return v
          .split('!')
          .map((e) => '+ ' + o.getStr(e))
          .join(', ');
    },
  ],
  [
    ['GhostSpawnSecs'],
    (v, o) => {
      return v
          .split('!')
          .map((e) => o.fixTime(e))
          .join(', ');
    },
  ],
  [
    ['StringParam', 'ShipToSpawn'],
    (v, o) => o.getStr(v.replace(/Cerberus(.*)/, '$1')),
  ],
  [
    ['module'],
    (v, o) => {
      const arr = v.split('!');
      return `${o.getStr(arr[0])} ${arr[1]}`;
    },
  ],
  [
    ['PassiveIncomeModifier', 'UnityMaxDamageIncreasePct'],
    (v) => `+${v}%`,
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
    (v, o) => o.fixTime(v * 120),
  ],
  [
    ['TargetSwitchTicks'],
    (v, o) => o.fixTime(v / 5),
  ],
  [
    ['PreparationTimeHours'],
    (v, o) => v + ' ' + o.getStr('hours'),
  ],
];
export const objectEdition = [
  (v, o) => {
    return Object.keys(v)
        .map((i) => `${o.getStr(i)}: ${v[i]}`)
        .join(', ');
  },
];

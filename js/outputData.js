'use strict';
import { getStr } from './getString.js';
import 'regenerator-runtime/runtime';

const data = {
  modules: import('../data/modulesData'),
  ships: import('../data/capital_shipsData'),
  yellow_star_sectors: import('../data/yellow_star_sectorsData'),
  planets: import('../data/planetsData.js'),
  colonize_prices: import('../data/colonize_pricesData'),
  planet_levels: import('../data/planet_levelsData'),
  artifacts: import('../data/artifactsData'),
  stars: import('../data/starsData'),
  spacebuildings: import('../data/spacebuildingsData'),
  player_goals: import('../data/player_goalsData'),
  achievements: import('../data/achievementsData'),
  alliance_levels: import('../data/alliance_levelsData'),
  cerberus_stations: import('../data/cerberus_stationsData'),
};
const iconsData = {
  modules: require('../img/modules_icons/*.png'),
  ships: require('../img/ships_icons/*.png'),
  spacebuildings: require('../img/spaceBuildings_icons/*.png'),
  stars: require('../img/stars_icons/*.png'),
};

const ignoringHeaders = ['maxLevel', 'Name', 'TID', 'TID_Description', 'Icon', 'SlotType', 'Model', 'AwardLevel'];
const cerbModules = ['cerbShield', 'cerbWeapon', 'cerbModule'];
const noFixTables = ['blueprintsCombat', 'blueprintsUtility', 'blueprintsSupport', 'WarpLaneHub', 'DONTFIXTABLE', 'Transport', 'Miner', 'Battleship'];
const body = $('body');

async function generatePageTables(typeData, category = null, elem = null) {
  let obj; let icons;
  const isCerb = (category == 'cerberus');

  if (typeData.constructor.name == 'Object') {
    obj = {};
    obj.data = typeData;
  } else {
    obj = await data[typeData];
    icons = await iconsData[typeData];
  }
  const items = (category != null) ? obj.byTypes[category.toLowerCase()] :
    (elem != null) ? [elem] : [Object.keys(obj)[0]];

  for (const item of items) {
    const module = (category != null || elem != null) ? obj.data[item] : obj.data;
    let icon = '';
    let id; let typeCerbModule; let lvlStyle; let lvlCol; let modifier;

    if (isCerb) {
      typeCerbModule = { name: null, type: null };
    }
    if (['planets', 'colonize_prices', 'yellow_star_sectors', 'artifacts', 'stars'].includes(typeData)) {
      lvlCol = '№';
      lvlStyle = 'style="padding-left: 37px"';
    }
    if (module.Name == 'RedStar') modifier = 0;
    if (module.Name == 'blueprintsSupport') modifier = 2;
    // свитчер иконок
    switch (typeData) {
      case 'modules':
        icon = genModuleIcon(icons[module.Icon]);
        break;
      case 'ships':
        if (!isCerb) break;
        icon = genCerbIcon(icons[module.Model]);
        break;
      case 'spacebuildings':
        icon = genModuleIcon(icons[module.Model], false, module.Name);
        break;
      case 'stars':
        icon = genModuleIcon(icons[module.Icon], false, module.Name);
        break;
      default:
        break;
    }
    if (module.TID != undefined && !Array.isArray(module.TID)) { // если это просто данные
      $('ol').append($('<li/>', {
        html: `<span><a href="#${module.Name}">${getStr(module.TID)}</a></span>`,
      }));
      body.append($('<div/>', {
        class: 'title',
        html: icon + $('<div/>', {
          class: 'title-text',
          html: `<a href="#${module.Name}" id="${module.Name}">${getStr(module.TID)}</a>`,
        })[0]['outerHTML'],
      }));
    }
    if (module.TID_Description != undefined && !Array.isArray(module.TID_Description)) {
      body.append($('<blockquote/>', {
        html: fixDesc(getStr(module.TID_Description)),
      }));
    }
    addStringStats(module, isCerb, typeCerbModule);
    if (isCerb) await addModuleCerb(module, typeCerbModule);
    if (module.maxLevel <= 1) continue;
    const keys = [];
    for (const key in module) {
      if (Array.isArray(module[key])) {
        keys.push(key);
      }
    }
    const levelTable = genLevelTable(lvlCol, module.maxLevel, modifier); // уровни / циферки
    const table = genStatsTableHead(keys, module.Name) + genStatsTableBody(keys, module); // шапка и тело
    try {
      if (!Array.isArray(module.Name)) { // лучше пусть "undefined", чем массив
        id = module.Name;
      }
    } catch (e) {
      id = typeData;
    }
    body.append($('<div/>', { // затолкать готовую таблицу на страницу
      class: 'gTable',
      html: levelTable + $('<div/>', {
        class: `gTable-stats`,
        html: `<table class="${getCalss(module.Name)}" ${lvlStyle} id ="${id}-table">${table}</table>`,
      })[0]['outerHTML'],
    }));
  }
  $('body > div.gTable').wrap('<div class="tableEnvironment"></div>');
}
// сгенерировать html иконки
function genModuleIcon(url, isModules = true, custom = 'null') {
  let classes = 'icon-background';
  let html = `class="icon" style="background-image:url(${url})">`;
  if (isModules) classes += ' module-bg';
  if (!isModules) classes += ' spaceBuildings-bg';
  if (custom == 'TimeModulator' || custom.endsWith('Star')) classes += ' round-bg';
  if (custom == 'WarpLaneHub') {
    classes += ' warpLine-bg';
    html = 'class="icon warpLine-body">';
  }
  return $('<div/>', {
    class: classes,
    html: `<span ${html}</span>`,
  })[0]['outerHTML'];
}
function genCerbIcon(url) {
  return $('<div/>', {
    class: 'cerberus',
    html: `<img src="${url}" alt="">`,
  })[0]['outerHTML'];
}
// исправить написание с новой троки (\n)
function fixDesc(descRaw) {
  return descRaw.replace(
    /(\\n\\n)(.)|(\\n)(.)/g,
    function (str, n, freistLetter) {
      return '<br/>' + freistLetter.toUpperCase();
    });
}
// найти кастом пушку Цербера
function findModuleCerb(key, typeCerbModule) {
  for (const stats of cerbModules) {
    if (getStr(key) == getStr(stats)) {
      typeCerbModule.name = key;
      typeCerbModule.type = stats;
      return true;
    }
  }
  return false;
}
// добавить вне табличные данные
function addStringStats(data, isCerb, cerbObj) {
  const keys = [];
  for (const key of Object.keys(data)) {
    if (!Array.isArray(data[key]) && !ignoringHeaders.includes(key)) {
      keys.push(key);
    }
  }
  for (const key of keys) { // добавление доп стат
    if (isCerb && findModuleCerb(key, cerbObj)) continue;
    body.append($('<h2/>', {
      'class': 'stringStsts',
      'html': `<b>${getStr(key)}</b>: ${getFormatValue(key, data[key])}`,
    }));
  }
}
// добавить пушку Церебера
async function addModuleCerb(obj, typeCerbModule) {
  if (typeCerbModule.name != null) {
    body.append($('<h2/>', {
      'class': 'stringStsts cerberusModule',
      'html': `<b>${getStr(typeCerbModule.name)}</b>:`,
    }));
    let module = await data.modules;
    module = module.data[typeCerbModule.name];
    for (const key in module) {
      if (ignoringHeaders.includes(key)) continue;
      let str = module[key];
      if (Array.isArray(module[key])) str = fixHydraWeapon(key);
      body.append($('<h2/>', {
        'class': 'stringStsts',
        'html': `<b>${getStr(key)}</b>: ${getFormatValue(key, str)}`,
      }));
    }
    function fixHydraWeapon(key) {
      const index = obj.HydraBarrage - 1;
      return module[key][index];
    }
  }
}
// сгенерировать колонку лвлов
function genLevelTable(lvlCol, maxLevel, modifier = 1) {
  let result = `<thead><tr><th>${getStr(lvlCol || 'lvl')}</th></tr></thead>`;
  result += '<tbody>';
  for (let i = 0; i < maxLevel; i++) {
    result += `<tr><td>${i + modifier}</td></tr>\n`;
  }
  result += '</tbody>';
  result = $('<div/>', {
    'class': 'gTable-lvls',
    'html': `<table>${result}</table>`,
  })[0]['outerHTML'];
  return result;
}
// сгенерировать шапку по ключам
function genStatsTableHead(keys, objName) {
  let result = '<thead><tr>';
  for (let i = 0; i < keys.length; i++) {
    result += `<th>${getFormatHead(objName, keys[i])}</th>`;
  }
  result += '</tr></thead>';
  return result;
}
// сгенерировать тело по ключам
function genStatsTableBody(keys, data) {
  let result = '<tbody>';
  for (let i = 0; i < data.maxLevel; i++) {
    result += '<tr>';
    for (let k = 0; k < keys.length; k++) {
      const value = getFormatValue(keys[k], data[keys[k]][i]);
      result += `<td>${value}</td>`;
    }
    result += '</tr>';
  }
  result += '</tbody>';
  return result;
}
function getCalss(name) {
  let r = 'generalTable';
  if (noFixTables.includes(name) || Array.isArray(name)) {
    r += ' noFixTable';
  }
  return r;
}
function fixTime(sec) {
  let result = '';
  const days = Math.floor(sec / 60 / 60 / 24);
  sec -= days * 24 * 60 * 60;
  const hours = Math.floor(sec / 60 / 60);
  sec -= hours * 60 * 60;
  const min = Math.floor(sec / 60);
  sec -= min * 60;
  if (days != 0) {
    result += days + `${getStr('days')} `;
  }
  if (hours != 0) {
    result += hours + `${getStr('hours')} `;
  }
  if (min != 0) {
    result += min + ` ${getStr('min')} `;
  }
  if (sec != 0) {
    result += Math.round(sec) + ` ${getStr('sec')}`;
  }
  return result || 0;
}
function getFormatValue(key, value) {
  // console.log(`${key} : ${value}`)
  const formatList = [
    {
      array: ['JobPayoutIncreasePercent', 'DamageReductionPct', 'TradeStationDeliverReward', 'DroneShipmentBonus', 'TradeBurstShipmentBonus', 'MirrorDamagePct', 'WaypointShipmentRewardBonus', 'UnityBoostPercent', 'IncreaseSectorHydroPct', 'HydroUploadPct', 'SpeedIncreasePerShipment', 'SalvageHullPercent', 'IncreaseSectorHydroPct', 'CreditIncomeModifier', 'FuelIncomeModifier', 'CreditStorageModifier', 'FuelStorageModifier', 'CreditShipmentModifier', 'FuelShipmentModifier', 'CancelBuildRefundPct', 'ArtifactYieldBonus', 'BlueStar_CRRewardRate', 'BlueStar_MaxHydroPerDayPct', 'BlueStar_HydroPctPerPos', 'DroneShipmentBonusMax', 'SalvageHullPercentWS', 'SalvageHullPercentBS', 'SpeedIncrDuringActivation'],
      func: (v) => v + '%',
    },
    {
      array: ['UnlockTime', 'SpawnLifetime', 'ActivationDelay', 'ActivationPrep', 'ActivationPrepBS', 'RedStarLifeExtention', 'TimeToFullyRegen', 'ShieldRegenDelay', 'EffectDurationx10', 'EffectDurationx10WS', 'EffectDurationx10BS', 'ActivationPrepWS', 'SpawnLifetime_WS', 'DesignUpgradeTime', 'ActivationDelayWS', 'ActivationDelayBS', 'MaxDPSTime_BS', 'MaxDPSTimeWS', 'MaxDPSTime', 'APTPIOTTPWS', 'DockedObjectDestroyTime', 'DisableTimeWS', 'SectorUnlockTime', 'TimeToUpgrade', 'TimeToResearch', 'TimeToLoad', 'Lifetime', 'ConstructionTime', 'TeleportShipmentsDurationHr', 'TimeSpeedupMaxSeconds', 'TimeSpeedupRegenPerDay', 'SpawnDelay', 'MoveUpdateSec', 'BlueStar_CRRewardWinLimitPeriod', 'WSLostBSTimeCooldown', 'WSLostOtherTimeCooldown', 'WSJumpBSTimeCooldown', 'WSJumpOtherTimeCooldown', 'ProximityTriggerSec', 'EMPResist', 'ProximityTriggerSecWS', 'DestinyDisableTimes', 'DestinyDisableTimesWS', 'SpawnFleetIntervalSeconds', 'ShieldRegenTimeAfterDamage', 'SectorEnrichCooldownSeconds'],
      func: (v) => fixTime(v),
    },
    {
      array: ['EffectRadiusWS', 'EffectRadiusBS', 'EffectRadius', 'DamageRange', 'DamageRangeWhenNeutralized', 'Speed', 'AttackRange'],
      func: (v) => v + ' ' + getStr('AU'),
    },
    {
      array: ['UnlockBlueprints', 'UnlockPrice', 'BCCost', 'BuildCost', 'DesignUpgradeCost', 'HP', 'WhiteStarScore', 'BSScore', 'ActivationFuelCost', 'AOEDamage', 'AOEDamage_WS', 'AOEDamage_BS', 'Damage', 'Cost', 'HydrogenPerDay', 'CreditStorage', 'FuelStorage', 'ShipmentsCRValuePerDay', 'array', 'SalvageCRReward', 'PriceInCrystals', 'XP', 'SalvageHydroReward', 'SectorUnlockCost', 'TotalShipmentCRPerDay', 'GoalTarget', 'CRReward', 'FuelReward', 'UnlockAmount', 'PCReward', 'XPReward', 'RelicsRequired', 'Score1Thresholds', 'Score2Thresholds', 'Score3Thresholds', 'CRAsteroidAmt', 'MaxHP', 'MaxShield'],
      func: (v) => Number(v).toLocaleString(),
    },
    {
      array: ['MoveHydrogenCostPerSector', 'TSHydroCost'],
      func: (v) => `${v.toLocaleString()} ${getStr('hyd')}.`,
    },
    {
      array: ['MiningSpeed'],
      func: (v) => v + '/' + getStr('min'),
    },
    {
      array: ['FuelUseIncrease', 'FuelUsePer5000Distance'],
      func: (v) => v + '/100' + getStr('AU'),
    },
    {
      array: ['TimeWarpFactor', 'TimeSpeedupFactor', 'TimeSlowdownFactor', 'MiningSpeedModifierPct'],
      func: (v) => 'x' + v,
    },
    {
      array: ['APTPIOTTP'],
      func: (v) => v + ' ' + getStr('sec'),
    },
    {
      array: ['TID', 'TID_Description', 'BaseType', 'TID_Artifact', 'InitialModule'],
      func: (v) => getStr(v),
    },
    {
      array: ['Model'],
      func: (v) => `<img class="ships" src="${iconsData.ships[v]}" alt="${v}">`,
    },
    {
      array: ['PlanetTypes', 'Name'],
      func: (v) => {
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
    },
    {
      array: ['NewModuleSlots'],
      func: (v) => {
        const arr = v.split('!');
        const result = [];
        for (const i of arr) {
          result.push('+' + getStr(i));
        }
        return result.join(', ');
      },
    },
    {
      array: ['GhostSpawnSecs'],
      func: (v) => v.replace(/(!)|(\d{1,2})/g,
        function (match) {
          return (match == '!') ? ', ' : `${match} ${getStr('sec')}`;
        }),
    },
    {
      array: ['StringParam', 'ShipToSpawn'],
      func: (v) => getStr(v.replace(/Cerberus(.*)/, '$1')),
    },
    {
      array: ['module'],
      func: (v) => {
        const arr = v.split('!');
        return `${getStr(arr[0])} ${arr[1]}`;
      },
    },
    {
      array: ['PassiveIncomeModifier', 'UnityMaxDamageIncreasePct'],
      func: (v) => `+${v}%`,
    },
    { // нужен рефакторинг
      array: ['Hydrogen', 'Credits', 'RegularInfuenceRange', 'InfluenceAwardThreshold', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      func: (v) => {
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
    },
    {
      array: ['TicksPerRelic'],
      func: (v) => fixTime(v * 120),
    },
    {
      array: ['TargetSwitchTicks'],
      func: (v) => fixTime(v / 5),
    },
    {
      array: ['PreparationTimeHours'],
      func: (v) => v + ' ' + getStr('hours'),
    },
  ];
  if (value.constructor.name == 'Object') {
    const r = [];
    for (const i in value) {
      r.push(`${getStr(i)}: ${value[i]}`);
    }
    return r.join(', ');
  }
  for (const i in formatList) {
    if (formatList[i].array.includes(key)) {
      return formatList[i].func(value);
    }
  }
  return value;
}
function getFormatHead(tableName, value) {
  const formatList = [
    {
      array: ['blueprintsSupport'],
      func: (v) => `${getStr('lvl')} ${Number(v) + 1}`,
    },
    {
      array: ['blueprintsCombat', 'blueprintsUtility'],
      func: (v) => `${getStr('lvl')} ${v}`,
    },
    {
      array: ['WhiteStar'],
      func: (v) => {
        if (/Score/.test(v)) {
          return getStr('ScoreNThresholds') + ' ' + v.replace(/Score(\d).*/, '$1');
        } else {
          return getStr(v);
        }
      },
    },
  ];
  for (const i in formatList) {
    if (formatList[i]['array'].includes(tableName)) {
      return formatList[i]['func'](value);
    }
  }
  return getStr(value);
}

export {
  generatePageTables,
  fixTime,
};

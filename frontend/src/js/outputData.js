'use strict';
import {getStr} from './getString.js';
import 'regenerator-runtime/runtime';
import {stringKeys} from './stringKeys';

const staticData = {
  modules: import('../../../data/modules'),
  ships: import('../../../data/capital_ships'),
  yellow_star_sectors: import('../../../data/yellow_star_sectors'),
  planets: import('../../../data/planets.js'),
  colonize_prices: import('../../../data/colonize_prices'),
  planet_levels: import('../../../data/planet_levels'),
  artifacts: import('../../../data/artifacts'),
  stars: import('../../../data/stars'),
  spacebuildings: import('../../../data/spacebuildings'),
  player_goals: import('../../../data/player_goals'),
  achievements: import('../../../data/achievements'),
  alliance_levels: import('../../../data/alliance_levels'),
  cerberus_stations: import('../../../data/cerberus_stations'),
};
const iconsData = {
  modules: require('../img/modules_icons/*.png'),
  ships: require('../img/ships_icons/*.png'),
  spacebuildings: require('../img/spaceBuildings_icons/*.png'),
  stars: require('../img/stars_icons/*.png'),
};
const ignoringHeaders = ['maxLevel', 'Name', 'TID', 'TID_Description', 'Icon', 'SlotType', 'Model', 'AwardLevel', 'popUpResources'];
const body = $('body');
const popUpResources = {};

/** Генерация и вставка на страницу таблиц
 * @param {object} args Объект, содержащий параметры
 * @param {(string|object)} args.data Имя файла Data или свой объект
 * @param {string=} args.category Имя категории из data.byTypes
 * @param {string=} args.single отобразить отдельный объект
 * @param {boolean=} args.notFixTables Добавить ли класс  к таблице
 * @param {array=} args.notFixTables Добавить класс "noFixTable" к таблицам
 * @param {string} [args.lvlColKey = "lvl"] Кастомный ключ заголовка столбика лвлов
 * @param {number} [args.lvlColModifier = 1] Добавлять это число при генерации столбика лвлов
 */
async function generatePageTables(args) {
  let obj; let icons;
  const isCerb = (args.category === 'cerberus');

  if (args.data.constructor == Object) {
    obj = {byTypes: null};
    obj.data = args.data;
  } else {
    obj = await staticData[args.data];
    icons = await iconsData[args.data];
  }
  const items =
      (args.single != null) ? [args.single] :
      (args.category != null) ? obj.byTypes[args.category.toLowerCase()] :
      [Object.keys(obj)[0]];

  for (const item of items) {
    const obj1 =
        (args.category != undefined) ? obj.data[item] :
        (args.single != undefined) ? obj.data[item] :
        obj.data;
    let id;
    const keysByArrays = [];
    const keysByStrings = [];
    const cerbModuleKey = findModuleCerb();
    const getIcon = {
      modules: () => genModuleIcon(icons[obj1.Icon]),
      ships: () => (!isCerb)? '' : genCerbIcon(icons[obj1.Model]),
      spacebuildings: () => genModuleIcon(icons[obj1.Model], false, obj1.Name),
      stars: () => genModuleIcon(icons[obj1.Icon], false, obj1.Name),
    };
    const icon = (args.data in getIcon) ? getIcon[args.data]() : '';

    if (obj1.TID != undefined && !Array.isArray(obj1.TID)) {
      $('ol').append($('<li/>', {
        html: `<span><a href="#${obj1.Name}">${getStr(obj1.TID)}</a></span>`,
      }));
      body.append($('<div/>', {
        class: 'title',
        html: icon + $('<div/>', {
          class: 'title-text',
          html: `<a href="#${obj1.Name}" id="${obj1.Name}">${getStr(obj1.TID)}</a>`,
        })[0].outerHTML,
      }));
    }
    if (obj1.TID_Description != undefined && !Array.isArray(obj1.TID_Description)) {
      body.append($('<div/>', {
        class: 'desc',
        html: getDesc(obj1.TID_Description),
      }));
    }
    await findAndAddLinkStatsModule();
    Object.keys(obj1).forEach((key) => {
      if (Array.isArray(obj1[key])) {
        keysByArrays.push(key);
      } else if (!ignoringHeaders.includes(key)) {
        keysByStrings.push(key);
      }
    });
    addStringStats(obj1, keysByStrings);
    if (cerbModuleKey) await addModuleCerb();

    // ========== Инициализация таблицы ========== //
    if (obj1.maxLevel <= 1) continue;
    const levelTable = genLevelTable(); // уровни / циферки
    const table = genStatsTableHead() + genStatsTableBody(); // шапка и тело
    try {
      if (!Array.isArray(obj1.Name)) { // лучше пусть "undefined", чем массив т.к. Name не всегда есть
        id = obj1.Name;
      }
    } catch (e) {
      id = Math.floor(Math.random() * Math.floor(1e5));
    }
    body.append($('<div/>', { // затолкать готовую таблицу на страницу
      class: 'gTable',
      html: levelTable + $('<div/>', {
        class: `gTable-stats`,
        html: `<table class="${getClasses()}" id ="${id}-table">${table}</table>`,
      })[0]['outerHTML'],
    }));
    $('body > div.gTable').wrap('<div class="tableEnvironment"></div>');

    // найти стату модуля, обновить имя, добавить данные для создания ссылки в popup
    async function findAndAddLinkStatsModule() {
      const modules = await staticData.modules;

      Object.keys(obj1).forEach((key) => {
        if (Object.keys(modules.data).includes(key)) {
          if (cerbModuleKey == key) return;
          popUpResources[key] = {
            page: modules.data[key].SlotType,
            module: key,
          };
        }
      });
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
    // сгенерировать html иконки 2
    function genCerbIcon(url) {
      return $('<div/>', {
        class: 'cerberus',
        html: `<img src="${url}" alt="">`,
      })[0].outerHTML;
    }
    // найти кастом пушку Цербера
    function findModuleCerb() {
      if (!isCerb) return null;
      const cerber = obj1.Name
          .replace(/Cerberus(.*)/, '$1')
          .replace(/(.*)ling\d/, '$1');

      for (const key of Object.keys(obj1)) {
        if (key.startsWith(cerber)) {
          return key;
        }
      }
    }
    // добавить пушку Церебера
    async function addModuleCerb() {
      let module = await staticData.modules;
      module = module.data[cerbModuleKey];
      const keys = [];

      body.append($('<h2/>', {
        'class': 'stringStsts cerberusModule',
        'html': `<b>${getStr('cerb' + module.SlotType)}</b>:`,
      }));
      Object.keys(module).forEach((key) => {
        if (!ignoringHeaders.includes(key)) {
          keys.push(key);
        }
      });
      addStringStats(module, keys);
    }
    // добавить доп статы
    function addStringStats(obj, keys) {
      for (const key of keys) {
        if (key == cerbModuleKey) continue;
        const click = getClick(key);
        let str = obj[key];

        if (Array.isArray(str)) str = fixHydraWeapon();
        body.append(
            $('<h2/>', {
              class: 'stringStsts',
              html: `<b>${getStr(key)}</b>: ${getFormatValue(key, str)}`,
              click,
            })
                .addClass((click) ? 'infoMark' : ''),
        );

        function fixHydraWeapon() {
          const index = obj1.HydraBarrage - 1;
          return obj[key][index];
        }
      }
    }
    // загрузить описание
    function getDesc(TID, key) {
      if (TID == undefined || Array.isArray(TID)) return;
      let result = fixDesc(getStr(TID));
      const customDescKey = ((key != undefined)? key : obj1.Name) + '_customDesc';

      if (getStr(customDescKey) != customDescKey) {
        result += '<br/><br/>' + getStr(customDescKey);
      }
      // if (Object.keys(popUpResources).includes(key)) {
      //   const url = `${location.protocol}//${location.hostname}/` +
      //       `${popUpResources[key].page.toLowerCase()}.html#${popUpResources[key].module}`;
      //   result += '<br/><br/>' +
      //       `<a href="${url}" target="_blank">${getStr('open')} ${getStr('typeMod' + popUpResources[key].page).toLowerCase()}</a>`;
      // }
      return result;
      // исправить написание с новой строки (\n)
      function fixDesc(descRaw) {
        return descRaw.replace(
            /(\\n\\n)(.)|(\\n)(.)/g,
            (str, n, firstLetter) => '<br/>' + firstLetter.toUpperCase());
      }
    }
    // получить функцию на вызов popup
    function getClick(key) {
      const desc = getDesc(getDescrKey(key));
      return (desc) ? (() => staticStatsInfo(getStr(key), desc)) : null;

      function getDescrKey(key, loop2 = false) {
        const ends = ['_DESCR', '_INFO'];
        for (const i of ends) {
          const newKey = ((loop2) ? key : stringKeys[key]) + i;
          if (getStr(newKey) != newKey) {
            return newKey;
          }
        }
        return (loop2)? null : getDescrKey(key, true);
      }
    }
    // сгенерировать колонку лвлов
    function genLevelTable() {
      const key = (args.lvlColKey == undefined)? 'lvl' : args.lvlColKey;
      const modifier = (args.lvlColModifier != undefined)? args.lvlColModifier : 1;

      let result = `<thead><tr><th>${getStr(key)}</th></tr></thead>`;
      result += '<tbody>';
      for (let i = 0; i < obj1.maxLevel; i++) {
        result += `<tr><td>${i + modifier}</td></tr>\n`;
      }
      result += '</tbody>';
      result = $('<div/>', {
        'class': 'gTable-lvls',
        'html': `<table>${result}</table>`,
      })[0].outerHTML;
      return result;
    }
    // сгенерировать шапку по ключам
    function genStatsTableHead() {
      let result = '<thead><tr>';
      keysByArrays.forEach((key) => {
        result += `<th id="${key}">${getFormatHead(obj1.Name, key)}</th>`;
        $(document).on('click', `#${key}`, getClick(key));
      });
      result += '</tr></thead>';
      return result;
    }
    // сгенерировать тело по ключам
    function genStatsTableBody() {
      let result = '<tbody>';
      for (let i = 0; i < obj1.maxLevel; i++) {
        result += '<tr>';
        for (let k = 0; k < keysByArrays.length; k++) {
          const value = getFormatValue(keysByArrays[k], obj1[keysByArrays[k]][i]);
          result += `<td>${value}</td>`;
        }
        result += '</tr>';
      }
      result += '</tbody>';
      return result;
    }
    // css классы таблицы
    function getClasses() {
      let r = 'generalTable';
      if (args.fixTable != undefined || (args.notFixTables != undefined && args.notFixTables.includes(obj1.Name))) {
        r += ' noFixTable';
      }
      return r;
    }
  }
}
function fixTime(sec) {
  let result = '';
  sec = parseInt(sec, 10);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec - (days * 86400)) / 3600);
  const minutes = Math.floor((sec - (hours * 3600 + days * 86400)) / 60);
  const seconds = sec - (days * 86400 + hours * 3600 + minutes * 60);

  if (days > 0) result += `${days}${getStr('days')}`;
  if (hours > 0) result += ` ${hours}${getStr('hours')}`;
  if (minutes > 0) result += ` ${minutes}${getStr('min')}`;
  if (seconds > 0) result += ` ${seconds}${getStr('sec')}`;
  return result || 0;
}
function getFormatValue(key, value) {
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
      array: ['UnlockBlueprints', 'UnlockPrice', 'BCCost', 'BuildCost', 'DesignUpgradeCost', 'HP', 'WhiteStarScore', 'BSScore', 'ActivationFuelCost', 'AOEDamage', 'AOEDamage_WS', 'AOEDamage_BS', 'Damage', 'Cost', 'HydrogenPerDay', 'CreditStorage', 'FuelStorage', 'ShipmentsCRValuePerDay', 'array', 'SalvageCRReward', 'PriceInCrystals', 'XP', 'SalvageHydroReward', 'SectorUnlockCost', 'TotalShipmentCRPerDay', 'GoalTarget', 'CRReward', 'FuelReward', 'UnlockAmount', 'PCReward', 'XPReward', 'RelicsRequired', 'Score1Thresholds', 'Score2Thresholds', 'Score3Thresholds', 'CRAsteroidAmt', 'MaxHP', 'MaxShield', 'ShieldStrength'],
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
          function(match) {
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

  if (key == undefined || value == undefined) {
    console.log(`Ошибка в ${key} : ${value}`);
    return;
  }
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
};

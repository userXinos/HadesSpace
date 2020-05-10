"use strict";
import { getStr } from './getString.js';
import 'regenerator-runtime/runtime'

const data = {
    modules: import('../data/modulesData'),
    ships: import('../data/shipsData'),
    yellow_star_sectors: import('../data/yellow_star_sectorsData'),
    planets: import('../data/planetsData.js'),
    colonize_prices: import('../data/colonize_pricesData'),
    planet_levels: import('../data/planet_levelsData'),
    artifacts: import('../data/artifactsData'),
    solar_system_gen_data: import('../data/solar_system_gen_dataData'),
    spacebuildings: import('../data/spacebuildingsData'),
    player_goals: import('../data/player_goalsData'),
    achievements: import('../data/achievementsData'),
    alliance_levels: import('../data/alliance_levelsData')
}
const iconsData = {
    modules: require('../img/modules_icons/*.png'),
    ships: require('../img/ships_icons/*.png'),
    spacebuildings: require('../img/spaceBuildings_icons/*.png')
}

let ignoringHeaders = ['maxLevel', 'Name', 'TID', 'TID_Description', 'Icon', 'SlotType', 'Model'];
let cerbModules = ['cerbShield', 'cerbWeapon', 'cerbModule'];
let noFixTables = ['blueprintsCombat', 'blueprintsUtility', 'blueprintsSupport', 'WarpLaneHub']

async function generatePageTables(typeData, category = null, elem = null) {
    let obj = await data[typeData]
    let icons = await iconsData[typeData]

    let items = (category != null) ? obj.byTypes[category.toLowerCase()] :
        (elem != null) ? [elem] : [Object.keys(obj)[0]]
    let isCerb = (category == 'cerberus');
    for (let item of items) {
        let module = (category != null || elem != null) ? obj.data[item] : obj.data
        let icon = '';
        let id, typeCerbModule, lvlStyle, lvlCol, modifier

        if (isCerb) {
            typeCerbModule = { name: null, type: null };
        }
        if (['planets', 'colonize_prices', 'yellow_star_sectors', 'artifacts'].includes(typeData)) {
            lvlCol = '№'
            lvlStyle = 'style="padding-left: 37px"'
        }
        if (module.Name == 'RedStar') modifier = 0
        //свитчер иконок
        switch (typeData) {
            case 'modules':
                icon = genModuleIcon(icons[module.Icon])
                break;
            case 'ships':
                if (!isCerb) break;
                icon = genCerbIcon(icons[module.Model])
                break;
            case 'spacebuildings':
                icon = genModuleIcon(icons[module.Model], true, module.Name)
                break;
            default:
                break;
        }
        if (module.TID != undefined && !Array.isArray(module.TID)) { // если это просто данные
            $('ol').append($('<li/>', {
                html: `<span><a href="#${module.Name}">${getStr(module.TID)}</a></span>`
            }));
            $('body').append($('<div/>', {
                class: 'title',
                html: icon + $('<div/>', {
                    class: 'title-text',
                    html: `<a href="#${module.Name}" name="${module.Name}">${getStr(module.TID)}</a>`
                })[0]['outerHTML'],
            }));
        }
        if (module.TID_Description != undefined && !Array.isArray(module.TID_Description)) {
            $('body').append($('<blockquote/>', {
                html: fixDesc(getStr(module.TID_Description))
            }));
        }
        addStringStats(module, isCerb, typeCerbModule)
        if (isCerb) await addModuleCerb(typeCerbModule)
        if (module.maxLevel <= 1) continue
        let keys = []
        for (let key in module) {
            if (Array.isArray(module[key]))
                keys.push(key)
        };
        let levelTable = genLevelTable(lvlCol, module.maxLevel, modifier);                            //уровни / циферки 
        let table = genStatsTableHead(keys, module.Name) + genStatsTableBody(keys, module) //шапка и тело
        try {
            if (!Array.isArray(module.Name)) { // лучше пусть "undefined", чем массив
                id = module.Name
            }
        } catch (e) {
            id = typeData
        }
        $('body').append($('<div/>', { // затолкать готовую таблицу на страницу 
            class: 'gTable',
            html: levelTable + $('<div/>', {
                class: `gTable-stats`,
                html: `<table class="${getCalss(module.Name)}" ${lvlStyle} id ="${id}-table">${table}</table>`
            })[0]['outerHTML']
        }))
    }
    $('body > div.gTable').wrap('<div class="tableEnvironment"></div>')
};
// сгенерировать html иконки
function genModuleIcon(url, isbuildings, custom) {
    let classes = 'module-background'
    let html = `class="module-icon" style="background-image:url(${url})">`
    if (isbuildings) classes += ' spaceBuildings-background'
    if (custom == 'TimeModulator') classes += ' timeModulator-background'
    if (custom == 'WarpLaneHub') {
        classes += ' warpLine-background'
        html = 'class="module-icon warpLine-body">'
    }
    return $('<div/>', {
        class: classes,
        html: `<span ${html}</span>`
    })[0]['outerHTML'];
};
function genCerbIcon(url) {
    return $('<div/>', {
        class: 'cerberus-background',
        html: `<img src="${url}" alt="">`
    })[0]['outerHTML'];
};
// исправить написание с новой троки (\n)
function fixDesc(descRaw) {
    return descRaw.replace(
        /(\\n\\n)(.)|(\\n)(.)/g,
        function (str, n, freistLetter) {
            return '<br/>' + freistLetter.toUpperCase()
        });
}
// найти кастом пушку Цербера
function findModuleCerb(key, typeCerbModule) {
    for (let stats of cerbModules) {
        if (getStr(key) == getStr(stats)) {
            typeCerbModule.name = key
            typeCerbModule.type = stats
            return true
        }
    }
    return false
}
// добавить вне табличные данные
function addStringStats(data, isCerb, cerbObj) {
    let keys = [];
    for (let key of Object.keys(data)) {
        if (!Array.isArray(data[key]) && !ignoringHeaders.includes(key))
            keys.push(key)
    };
    for (let key of keys) { // добавление доп стат
        if (isCerb && findModuleCerb(key, cerbObj)) continue
        $('body').append($('<h2/>', {
            'class': 'stringStsts',
            html: `<b>${getStr(key)}</b>: ${getFormat(key, data[key])}`
        }));
    }
}
// добавить пушку Церебера
async function addModuleCerb(typeCerbModule) {
    if (typeCerbModule.name != null) {
        $('body').append($('<h2/>', {
            'class': 'stringStsts cerberusModule',
            html: `<b>${getStr(typeCerbModule.name)}</b>:`
        }));
        let module = await data.modules
        module = module.data[typeCerbModule.name]
        for (let key in module) {
            if (ignoringHeaders.includes(key)) continue
            $('body').append($('<h2/>', {
                'class': 'stringStsts',
                html: `<b>${getStr(key)}</b>: ${getFormat(key, module[key])}`
            }));

        }
    }
}
// сгенерировать колонку лвлов 
function genLevelTable(lvlCol, maxLevel, modifier = 1) {
    let result = `<thead><tr><th>${getStr(lvlCol || "lvl")}</th></tr></thead>`
    result += '<tbody>'
    for (let i = 0; i < maxLevel; i++) {
        result += `<tr><td>${i + modifier}</td></tr>\n`
    };
    result += '</tbody>';
    result = $('<div/>', {
        'class': 'gTable-lvls',
        html: `<table>${result}</table>`
    })[0]['outerHTML'];
    return result
}
// сгенерировать шапку по ключам
function genStatsTableHead(keys, objName) {
    let result = '<thead><tr>';
    for (let i = 0; i < keys.length; i++) {
        result += `<th>${getFormat2(objName, keys[i])}</th>`
    }
    result += '</tr></thead>'
    return result
}
// сгенерировать тело по ключам
function genStatsTableBody(keys, data) {
    let result = '<tbody>';
    for (let i = 0; i < data.maxLevel; i++) {
        result += '<tr>';
        for (let k = 0; k < keys.length; k++) {
            let value = getFormat(keys[k], data[keys[k]][i]);
            result += `<td>${value}</td>`
        }
        result += '</tr>'
    }
    result += '</tbody>';
    return result
}
function getCalss(name) {
    let r = 'generalTable'
    if (noFixTables.includes(name)) {
        r += ' noFixTable'
    }
    return r
}
function fixTime(sec) {
    let result = '';
    let days = Math.floor(sec / 60 / 60 / 24);
    sec -= days * 24 * 60 * 60;
    let hours = Math.floor(sec / 60 / 60);
    sec -= hours * 60 * 60;
    let min = Math.floor(sec / 60);
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
};
function getFormat(key, value) {
    //console.log(`${key} : ${value}`)
    let formatList = [
        {
            array: ["JobPayoutIncreasePercent", "DamageReductionPct", "TradeStationDeliverReward", "DroneShipmentBonus", "TradeBurstShipmentBonus", "MirrorDamagePct", "WaypointShipmentRewardBonus", "UnityBoostPercent", "IncreaseSectorHydroPct", "HydroUploadPct", "SpeedIncreasePerShipment", "SalvageHullPercent", "IncreaseSectorHydroPct", "CreditIncomeModifier", "FuelIncomeModifier", "CreditStorageModifier", "FuelStorageModifier", "CreditShipmentModifier", "FuelShipmentModifier", "CancelBuildRefundPct", "ArtifactYieldBonus"],
            func: (v) => v + '%'
        },
        {
            array: ["UnlockTime", "SpawnLifetime", "ActivationDelay", "ActivationPrep", "ActivationPrepBS", "RedStarLifeExtention", "TimeToFullyRegen", "ShieldRegenDelay", "EffectDurationx10", "EffectDurationx10WS", "EffectDurationx10BS", "ActivationPrepWS", "SpawnLifetime_WS", "DesignUpgradeTime", "ActivationDelayWS", "ActivationDelayBS", "MaxDPSTime_BS", "MaxDPSTimeWS", "MaxDPSTime", "APTPIOTTPWS", "DockedObjectDestroyTime", "DisableTimeWS", "SectorUnlockTime", "TimeToUpgrade", "TimeToResearch", "TimeToLoad", "Lifetime", "ConstructionTime", "TeleportShipmentsDurationHr", "TimeSpeedupMaxSeconds", "TimeSpeedupRegenPerDay", "SpawnDelay", "MoveUpdateSec"],
            func: (v) => fixTime(v)
        },
        {
            array: ["EffectRadiusWS", "EffectRadiusBS", "EffectRadius", "DamageRange", "DamageRangeWhenNeutralized", "Speed"],
            func: (v) => v + " " + getStr("AU")
        },
        {
            array: ["UnlockBlueprints", "UnlockPrice", "BCCost", "BuildCost", "DesignUpgradeCost", "HP", "WhiteStarScore", "BSScore", "ActivationFuelCost", "AOEDamage", "AOEDamage_WS", "AOEDamage_BS", "Damage", "Cost", "HydrogenPerDay", "CreditStorage", "FuelStorage", "ShipmentsCRValuePerDay", "array", "SalvageCRReward", "PriceInCrystals", "XP", "SalvageHydroReward", "SectorUnlockCost", "TotalShipmentCRPerDay", "GoalTarget", "CRReward", "FuelReward", "UnlockAmount", "PCReward", "XPReward", "RelicsRequired"],
            func: (v) => Number(v).toLocaleString()
        },
        {
            array: ["MoveHydrogenCostPerSector", "TSHydroCost"],
            func: (v) => `${v.toLocaleString()} ${getStr("hyd")}.`
        },
        {
            array: ["MiningSpeed"],
            func: (v) => v + "/" + getStr("min")
        },
        {
            array: ["FuelUseIncrease", "FuelUsePer5000Distance"],
            func: (v) => v + "/100" + getStr("AU")
        },
        {
            array: ["TimeWarpFactor", "TimeSpeedupFactor"],
            func: (v) => 'x' + v
        },
        {
            array: ["APTPIOTTP"],
            func: (v) => v + " " + getStr('sec')
        },
        {
            array: ["MiningSpeedModifierPct"],
            func: (v) => 'x' + v + '%'
        },
        {
            array: ["TID", "TID_Description"],
            func: (v) => getStr(v)
        },
        {
            array: ["Model"],
            func: (v) => `<img class="model" src="${iconsData.ships[v]}" alt="${v}">`
        },
        {
            array: ["PlanetTypes", "Name"],
            func: (v) => {
                let result = [];
                let items = v.split('!')
                for (let item of items) {
                    if (item == ' ') return ' '
                    item = item.split('_')
                    result.push(`${getStr(item[0])} ${getStr('lvl')}. ${item[1].slice(-1)}`)
                }
                return result.join(', ')
            }
        },
        {
            array: ["BaseType"],
            func: (v) => {
                if (v == ' ') return ' '
                return getStr('lvl') + ' ' + v.replace(/\w*(\d)/, '$1')
            }
        },
        {
            array: ["NewModuleSlots"],
            func: (v) => {
                let arr = v.split("!");
                let result = [];
                for (let i of arr) {
                    result.push('+' + getStr(i));
                }
                return result.join(', ')
            }
        },
        {
            array: ["GhostSpawnSecs"],
            func: (v) => v.replace(/(!)|(\d{1,2})/g,
                function (match) {
                    return (match == '!') ? ", " : `${match} ${getStr('sec')}`;
                })
        },
        {
            array: ["StringParam"],
            func: (v) => getStr(v.replace(/Cerberus(.*)/, '$1'))
        },
        {
            array: ["module"],
            func: (v) => {
                let arr = v.split('!')
                return `${getStr(arr[0])} ${arr[1]}`
            }
        },
        {
            array: ["PassiveIncomeModifier"],
            func: (v) => `+${v}%`
        },
    ];
    if (value.constructor.name == 'Object') {
        let r = []
        for (let i in value) {
            r.push(`${getStr(i)}: ${value[i]}`)
        }
        return r.join(', ')
    }
    for (let i in formatList) {
        if (formatList[i]['array'].includes(key)) {
            return formatList[i]['func'](value);
        }
    };
    return value;
};
function getFormat2(key, value) {
    let formatList = [
        {
            array: ['blueprintsSupport'],
            func: (v) => `${getStr('lvl')} ${Number(v) + 1}`
        },
        {
            array: ['blueprintsCombat', 'blueprintsUtility'],
            func: (v) => `${getStr('lvl')} ${v}`
        }
    ]
    for (let i in formatList) {
        if (formatList[i]['array'].includes(key)) {
            return formatList[i]['func'](value);
        }
    };
    return getStr(value);
}

export {
    generatePageTables
}
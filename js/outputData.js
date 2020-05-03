"use strict";
import { getStr } from './getString.js';
import 'regenerator-runtime/runtime'

const data = {
    modules: import('../data/modulesData.js'),
    ships: import('../data/shipsData.js'),
    yellow_star_sectors: import('../data/yellow_star_sectorsData.js'),
    planets: import('../data/planetsData.js'),
    colonize_prices: import('../data/colonize_pricesData.js'),
    planet_levels: import('../data/planet_levelsData.js'),
}
const iconsData = {
    modules: require('../img/modules_icons/*.png'),
    ships: require('../img/ships_icons/*.png')
}

let ignoringHeaders = ['maxLevel', 'Name', 'TID', 'TID_Description', 'Icon', 'SlotType', 'Model'];
let cerbModules = ['cerbShield', 'cerbWeapon', 'cerbModule'];

async function generatePageTables(typeData, category = null, elem = null) {
    let obj = await data[typeData]
    let icons = await iconsData[typeData]

    //let items = (category) ? obj[typeData + 'ByTypes'][category.toLowerCase()] : [ Object.keys(obj)[0] ]

    let items = (category != null) ? obj[typeData + 'ByTypes'][category.toLowerCase()] :
        (elem != null) ? [elem] : [Object.keys(obj)[0]]
    let isCerb = (category == 'cerberus');


    for (let item of items) {
        let module = (category != null || elem != null) ? obj[typeData + 'Data'][item] : obj[typeData + 'Data']
        let icon = '';
        let typeCerbModule

        if (isCerb) {
            typeCerbModule = { name: null, type: null };
        }

        switch (typeData) {
            case 'modules':
                icon = $('<div/>', {
                    'class': 'module-background',
                    html: `<span class="module-icon" style="background-image:url(${icons[module.Icon]})"></span>`
                })[0]['outerHTML'];
                break;
            case 'ships':
                if (!isCerb) break;
                icon = $('<div/>', {
                    'class': 'cerberus-background',
                    html: `<img src="${icons[module.Model]}" alt="${module.Name}">`
                })[0]['outerHTML'];
                break;
            default:
                break;
        }
        if (module.TID != undefined && module.TID_Description != undefined && !Array.isArray(module.TID)) { // если это просто таблица
            let title = `<a href="#${module.Name}" name="${module.Name}">${getStr(module.TID)}</a>`;
            let titleAndIcom = `<div class="title">${icon}<div class="title-text ">${title}</div></div>`;
            let listItem = `<li><span><a href="#${module.Name}">${getStr(module.TID)}</a></span></li>`;
            $('body').append(titleAndIcom);
            $('ol').append(listItem);
            $('body').append(`<blockquote>${fixDesc(getStr(module.TID_Description))}</blockquote>`);
        }
        let sectorsStyle = null
        let lvlCol = null
        // if (typeData == 'yellow_star_sectors') {
        //     lvlCol = 'sector'
        //     sectorsStyle = 'style="padding-left: 70px"'
        // }
        if (typeData == 'planets' || typeData == 'colonize_prices' || typeData == 'yellow_star_sectors') {
            lvlCol = '№'
            sectorsStyle = 'style="padding-left: 37px"'
        }

        let keys = [];
        for (let key of Object.keys(module)) {
            if (!Array.isArray(module[key]) && !ignoringHeaders.includes(key))
                keys.push(key)
        };
        for (let key of keys) { // добавление доп стат
            if (isCerb && findModuleCerb(key, typeCerbModule)) continue
            $('body').append($('<h2/>', {
                'class': 'stringStsts',
                html: `<b>${getStr(key)}</b>: ${getFormat(key, module[key])}`
            }));
        }
        if (isCerb) await addModuleCerb(typeCerbModule)
        if (module['maxLevel'] <= 1) continue
        keys = []
        for (let key in module) {
            if (Array.isArray(module[key]))
                keys.push(key)
        };
        let levelTable = `<thead><tr><th>${getStr(lvlCol || "lvl")}</th></tr></thead>\n`;
        levelTable += '<tbody>\n'
        for (let i = 0; i < module.maxLevel; i++) {  //уровни, циферки
            levelTable += `<tr><td>${i + 1}</td></tr>\n`
        };
        levelTable += '</tbody>';
        levelTable = $('<div/>', {
            'class': 'gTable-lvls',
            html: `<table>${levelTable}</table>`
        })[0]['outerHTML'];
        let statsTable = '<thead>\n<tr>';
        for (let i = 0; i < keys.length; i++) {  //шапка
            statsTable += `<th>${getStr(keys[i])}</th>\n`
        }
        statsTable += '</tr>\n</thead>\n'
        statsTable += '<tbody>\n';
        for (let i = 0; i < module.maxLevel; i++) { //тело
            statsTable += '<tr>';
            for (let k = 0; k < keys.length; k++) {
                let value = getFormat(keys[k], module[keys[k]][i]);
                statsTable += `<td>${value}</td>\n`
            }
            statsTable += '</tr>\n'
        }
        statsTable += '</tbody>';
        statsTable = $('<div/>', {
            'class': 'gTable-stats',
            html: `<table class="generalTable" ${sectorsStyle} id ="${module.Name}-table">${statsTable}</table>`
        })[0]['outerHTML'];

        $('body').append($('<div/>', {
            'class': 'gTable',
            html: levelTable + statsTable
        }));
    };
    $('body > div.gTable').wrap('<div class="tableEnvironment"></div>')
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
// пушка Церебера нужна тут
async function addModuleCerb(typeCerbModule) {
    if (typeCerbModule.name != null) {
        $('body').append($('<h2/>', {
            'class': 'stringStsts cerberusModule',
            html: `<b>${getStr(typeCerbModule.name)}</b>:`
        }));
        let module = await data.modules
        module = module.modulesData[typeCerbModule.name]
        for (let key in module) {
            if (ignoringHeaders.includes(key)) continue
            $('body').append($('<h2/>', {
                'class': 'stringStsts',
                html: `<b>${getStr(key)}</b>: ${getFormat(key, module[key])}`
            }));

        }
    }
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
    let formatList = [
        {
            array: ["JobPayoutIncreasePercent", "DamageReductionPct", "TradeStationDeliverReward", "DroneShipmentBonus", "TradeBurstShipmentBonus", "MirrorDamagePct", "WaypointShipmentRewardBonus", "UnityBoostPercent", "IncreaseSectorHydroPct", "HydroUploadPct", "SpeedIncreasePerShipment", "SalvageHullPercent", "IncreaseSectorHydroPct", "CreditIncomeModifier", "FuelIncomeModifier", "CreditStorageModifier", "FuelStorageModifier", "CreditShipmentModifier", "FuelShipmentModifier"],
            func: (v) => v + '%'
        },
        {
            array: ["UnlockTime", "SpawnLifetime", "ActivationDelay", "ActivationPrep", "ActivationPrepBS", "RedStarLifeExtention", "TimeToFullyRegen", "ShieldRegenDelay", "EffectDurationx10", "EffectDurationx10WS", "EffectDurationx10BS", "ActivationPrepWS", "SpawnLifetime_WS", "DesignUpgradeTime", "ActivationDelayWS", "ActivationDelayBS", "MaxDPSTime_BS", "MaxDPSTimeWS", "MaxDPSTime", "APTPIOTTPWS", "DockedObjectDestroyTime", "DisableTimeWS", "SectorUnlockTime", "TimeToUpgrade"],
            func: (v) => fixTime(v)
        },
        {
            array: ["EffectRadiusWS", "EffectRadiusBS", "EffectRadius", "DamageRange", "DamageRangeWhenNeutralized", "Speed"],
            func: (v) => v + " " + getStr("AU")
        },
        {
            array: ["UnlockBlueprints", "UnlockPrice", "BCCost", "BuildCost", "DesignUpgradeCost", "HP", "WhiteStarScore", "BSScore", "ActivationFuelCost", "AOEDamage", "AOEDamage_WS", "AOEDamage_BS", "Damage", "Cost", "HydrogenPerDay", "CreditStorage", "FuelStorage", "ShipmentsCRValuePerDay", "array"],
            func: (v) => Number(v).toLocaleString()
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
            array: ["TimeWarpFactor"],
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
                let palnets = v.split('!')
                for (let planet of palnets) {
                    if (planet == ' ') return ' '
                    planet = planet.split('_')
                    result.push(`${getStr(planet[0])} ${getStr('lvl')}. ${planet[1].slice(-1)}`)
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
        }
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

export {
    generatePageTables
}
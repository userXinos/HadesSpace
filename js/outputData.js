import * as  modulesData from '../data/modulesData.js';
import * as  shipsData from '../data/shipsData.js';
import { getStr } from './getString.js';
let modulesIcons = require('../img/modules_icons/*.png');
let shipsIcons = require('../img/ships_icons/*.png');
let ignoringHeaders = ['maxLevel','Name','TID','TID_Description','Icon','SlotType','Model'];

function generatePageTables(typeData, category = null, elem){
    let ByTypes = typeData + 'ByTypes';
    typeData = typeData + 'Data';
    let items = (category != null) ? eval(typeData)[ByTypes][category.toLowerCase()] : [elem]

    for (let item of items) {
        let module = eval(typeData)[typeData][item];
        let title = `<a href="#${module.Name}" name="${module.Name}">${getStr(module.TID)}</a>`;
        let icon = ""
        if(typeData == 'modulesData'){
            icon = $('<div/>', { 
                'class': 'module-background',
                 html  : `<span class="module-icon" style="background-image:url(${modulesIcons[module.Icon]})"></span>`
            })[0]['outerHTML'];
        }
        let titleAndIcom = `<div class="title">${icon}<div class="title-text ">${title}</div></div>`;
        let listItem = `<li><span><a href="#${module.Name}">${getStr(module.TID)}</a></span></li>`;
        $('body').append(titleAndIcom);
        $('ol').append(listItem);
        function addDesc(){
            let descRaw = getStr(module.TID_Description);
            let descFix = descRaw.replace(
                /(\\n\\n)(.)|(\\n)(.)/g,
                function(str, n, freistLetter){
                    return '<br/>'+freistLetter.toUpperCase()
            });
            $('body').append(`<blockquote>${descFix}</blockquote>`);
        }
        let keys = [];
        for (let key of Object.keys(module)) {
            if (!(Array.isArray(module[key])) && !(ignoringHeaders.includes(key)))
                keys.push(key)
        };
        for (let key of keys) { // добавление доп стат
            $('body').append( $('<h2/>', { 
                 'class': 'stringStsts',
                  html  : `<b>${getStr(key)}</b>: ${getFormat(key,module[key])}`
             }));
        }
        if(module['maxLevel'] <= 1) continue
        keys = []
        for (let key in module) {
            if(Array.isArray(module[key]))
                keys.push(key)
        };
        let levelTable =`<thead><tr><th>${getStr("lvl")}</th></tr></thead>\n`;
        levelTable += '<tbody>\n'
        for (let i = 0; i < module.maxLevel; i++) {  //уровни, циферки
            levelTable += `<tr><td>${i+1}</td></tr>\n`
        };
        levelTable += '</tbody>';
        levelTable = $('<div/>', { 
            'class': 'gTable-lvls',
             html  : `<table>${levelTable}</table>`
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
             html  : `<table class="generalTable" id ="${module.Name}-table">${statsTable}</table>`
        })[0]['outerHTML'];

        $('body').append( $('<div/>', { 
            'class': 'gTable',
             html  : levelTable + statsTable
        }));
    };
    $('body > div.gTable').wrap('<div class="tableEnvironment"></div>')
};
function generateCerberusInfo(typeData,category){
    let ByTypes = typeData + 'ByTypes';
    typeData = typeData + 'Data';
    let items = eval(typeData)[ByTypes][category.toLowerCase()];
    let cerbModules = ['cerbShield','cerbWeapon', 'cerbModule']

    for (let item of items) {
        let module = eval(typeData)[typeData][item];
        let title = `<a href="#${module.Name}" name="${module.Name}">${getStr(module.TID)}</a>`;
        let icon = "";
        console.log(shipsIcons[module.Model])
        console.log([module.Model] + '^')
            icon = $('<div/>', { 
                'class': 'cerberus-background',
                 html  : `<img src="${shipsIcons[module.Model]}" alt="${module.Name}">`
            })[0]['outerHTML'];

        let titleAndIcom = `<div class="title">${icon}<div class="title-text ">${title}</div></div>`;
        let listItem = `<li><span><a href="#${module.Name}">${getStr(module.TID)}</a></span></li>`;
        $('body').append(titleAndIcom);
        $('ol').append(listItem);

        let descRaw = getStr(module.TID_Description);
        let descFix = descRaw.replace(
            /(\\n\\n)(.)|(\\n)(.)/g,
            function(str, n, freistLetter){
                return '<br/>'+freistLetter.toUpperCase()
        });
        $('body').append(`<blockquote>${descFix}</blockquote>`);
        let keys = [];
        for (let key of Object.keys(module)) {
            if (!(Array.isArray(module[key])) && !(ignoringHeaders.includes(key)))
                keys.push(key)
        };
        let typeCerbModule = {name:null,type:null}
        for (let key of keys) {
            for(let stats of cerbModules){
                if(getStr(key) == getStr(stats)){ // найти кастом пушку 
                    typeCerbModule.name = key
                    typeCerbModule.type = stats
                    continue
                }
            }
            if(typeCerbModule.name != null) continue // если у Цербера кастомная пушка - она не нужна тут
            $('body').append( $('<h2/>', { 
                 'class': 'stringStsts',
                  html  : `<b>${getStr(key)}</b>: ${getFormat(key,module[key])}`
             }));
        }
        if(typeCerbModule.name != null){ // она нужна тут
            $('body').append( $('<h2/>', { 
                'class': 'stringStsts cerberusModule',
                 html  : `<b>${getStr(typeCerbModule.name)}</b>:`
            }));
            module = modulesData.modulesData[typeCerbModule.name]
            for(let key in module){
                if(ignoringHeaders.includes(key)) continue
                $('body').append( $('<h2/>', { 
                    'class': 'stringStsts',
                        html  : `<b>${getStr(key)}</b>: ${getFormat(key,module[key])}`
                }));
            
            }
        }
    };
};

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
    return result || 0 ;
};

function getFormat(key, value) {
    let formatList = [
        {
            array: ["JobPayoutIncreasePercent", "DamageReductionPct", "TradeStationDeliverReward", "DroneShipmentBonus", "TradeBurstShipmentBonus", "MirrorDamagePct", "WaypointShipmentRewardBonus", "UnityBoostPercent", "IncreaseSectorHydroPct", "HydroUploadPct", "SpeedIncreasePerShipment", "SalvageHullPercent", "IncreaseSectorHydroPct"],
            func: (v) => v + '%'
        },
        {
            array: ["UnlockTime", "SpawnLifetime", "ActivationDelay", "ActivationPrep", "ActivationPrepBS", "RedStarLifeExtention","TimeToFullyRegen","ShieldRegenDelay","EffectDurationx10","EffectDurationx10WS","EffectDurationx10BS","ActivationPrepWS","SpawnLifetime_WS","DesignUpgradeTime","ActivationDelayWS","ActivationDelayBS","MaxDPSTime_BS","MaxDPSTimeWS","MaxDPSTime","APTPIOTTPWS","DockedObjectDestroyTime","DisableTimeWS"],
            func: (v) => fixTime(v)
        },
        {
            array: ["EffectRadiusWS", "EffectRadiusBS", "EffectRadius", "DamageRange", "DamageRangeWhenNeutralized","Speed"],
            func: (v) => v + " " + getStr("AU")
        },
        {
            array: ["UnlockBlueprints", "UnlockPrice","BCCost","BuildCost","DesignUpgradeCost","HP","WhiteStarScore","BSScore","ActivationFuelCost","AOEDamage","AOEDamage_WS","AOEDamage_BS","Damage"],
            func: (v) => Number(v).toLocaleString()
        },
        {
            array: ["MiningSpeed"],
            func: (v) => v + "/" + getStr("min")
        },
        {
            array: ["FuelUseIncrease","FuelUsePer5000Distance"],
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
            array: ["Model"],
            func: (v) => `<img class="model" src="${shipsIcons[v]}" alt="${v}">`
        },
        {
            array: ["NewModuleSlots"],
            func: (v) => {
                let arr = v.split("!");
                let result = [];
                for(let i of arr){
                    result.push('+' + getStr(i));
                }
                return result.join(', ')
            }
        }
    ];
    for(let i in formatList){
        if(formatList[i]['array'].includes(key)){
            return formatList[i]['func'](value);
        }
    };
    return value;
  };

export {
    generatePageTables,
    generateCerberusInfo
}
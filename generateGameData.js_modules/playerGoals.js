"use strict";

const mainJs = require('../generateGameData.js')

function generatePlayerGoals(args) {
    let obj = args.rawData
    let whiteList = args.needFix
    let newKeys = {
        'CRRewardPerDay': 'CRReward',
        'FuelRewardPerDay': 'FuelReward'
    }

    for (let k of Object.keys(obj)) {
        let obj1 = obj[k]

        mainJs.fillSpace(obj1, ' ', 'push')
        if (!whiteList.includes(k)) continue
        if (k == 'SalvageArtifacts') { // фикс значения "уровень арта", не удобно форматировать и локализировать
            obj1.artLevel = []
            obj1.StringParam.forEach((e, i, arr) => {
                obj1.artLevel.push(e.split('!')[0])
            });
            delete obj1.StringParam
            obj[k] = obj1
        }
        if (k.startsWith('WinBSWith')) { // фикс квестов ГЗ
            obj1.module = k.replace(/WinBSWith(.+?)(\d?)$/, '$1!$2')
        }
        for (let i in obj1) {
            if (Object.keys(newKeys).includes(i)) { // пофиксить награды, тк они равны за 1 день
                if (Array.isArray(obj1[i])) {
                    obj1[i].forEach((e, i, arr) => {
                        arr[i] = e * obj1['TimeLimitDays'][i] || e * obj1['TimeLimitDays']
                    });
                } else {
                    obj1[i] = obj1[i] * obj1['TimeLimitDays']
                }
                obj[k] = mainJs.renameKeys(obj1, newKeys)
            }
        }
    }
    return obj
}

exports.default = generatePlayerGoals
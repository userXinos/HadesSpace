"use strict";
import { getStr } from './getString.js';
import { fixTime } from './outputData.js';
import { data as planetsData } from '../data/planetsData';
import { data as levelsData } from '../data/planet_levelsData';
import 'regenerator-runtime/runtime'

let planets = planetsData.yellowstarTable
let levels = levelsData
let dataOutput = ['CreditStorage', 'FuelStorage', 'CreditsPerHour', 'FuelPerHour', 'ShipmentsCRValuePerDay']
let modifiers = ['CreditStorageModifier', 'FuelStorageModifier', 'CreditIncomeModifier', 'FuelIncomeModifier', 'CreditShipmentModifier']
let dataTotal = ['Cost', 'TimeToUpgrade']

func()
async function func() {
    $('h1').append(`${getStr('planetscalc')}`);
    $('body').append(`<title>${getStr('planetscalc')}</title>`);
    $('body').append($('<table/>', {
        class: 'planetsCalc'
    }))
    for (let i of dataOutput) {
        let td = ''
        let rows = ['actually', 'plan', 'result']

        td += $('<td/>', { // имена rows 
            text: getStr(i)
        })[0].outerHTML
        rows.forEach(e => {
            td += $('<td/>', {
                id: i + e,
                text: 0
            })[0].outerHTML
        })
        $('table.planetsCalc').append($('<tr/>', {
            html: td
        }))
    }
    for (let i of dataTotal) {
        let td = ''
        td += $('<td/>', { // имена rows 
            text: getStr(i)
        })[0].outerHTML
        td += $('<td/>', {
            id: i + 'result',
            text: 0,
            colspan: 3,
            style: 'font-weight: bold'
        })[0].outerHTML
        $('table.planetsCalc').append($('<tr/>', {
            html: td
        }))
    }
    $('body').append($('<div/>', { // кнопки
        class: 'resetButtons',
        html: `<button class = "resetButtonAll" name="button" onclick="reset()">${getStr('resetAll')}</button>
                <button name="button" onclick="reset('plan')">${getStr('resetPlan')}</button>`
    }))
    planets.lvl = []
    planets.plan = []
    let keys = ['TID', 'lvl', 'plan'] // модификация табличных данных
    for (let i in planets.Name) {
        let select = ''
        for (let lvl = 0; planets.MaxUpgradeLevel[i] + 1 > lvl; lvl++) {
            select += `<option>${lvl}</option>`
        }
        planets.lvl.push(`<select onchange="changeLvl(this,'${i}')"> ${select} </select>`)
        planets.plan.push(`<select onchange="changeLvl(this,'${i}', 'plan')"> ${select} </select>`)
    }
    await generatePageTables(planets, null, keys)
    loadUserData()
}
// колбек выбора лавлов 
window.changeLvl = function (index, planetIndex, isPlan = false) {
    let data = JSON.parse(localStorage.getItem('planetsCalc')) || {}
    let planet = planets.Name[planetIndex]
    index = index.value - 1
    let obj

    if (!data.actually) data.actually = {}
    if (!data.plan) data.plan = {}
    if (isPlan) {
        obj = data.plan
    } else {
        obj = data.actually
    }
    obj[planet] = index + 1 || 0
    index++
    if (!isPlan) { // подогнать план под уровень
        if (data.plan[planet]) {
            if (data.plan[planet] < index) {
                data.plan[planet] = index
            }
        } else {
            data.plan[planet] = index
        }
    }
    localStorage.setItem('planetsCalc', JSON.stringify(data));
    loadUserData()
}
// колбек кнопок
window.reset = function (isPlan) {
    if (!isPlan) {
        let msg = confirm("Reset all? Ar u serious ?");
        if (msg) {
            localStorage.removeItem('planetsCalc')
        } else {
            return
        }
    } else {
        let obj = JSON.parse(localStorage.getItem('planetsCalc')) || {}
        if (obj.plan) {
            for (let i in obj.plan) {
                obj.plan[i] = obj.actually[i]
            }
        } else {
            obj.plan = {}
        }
        localStorage.setItem('planetsCalc', JSON.stringify(obj))
    }
    location.reload();
}
// вычислить данные
function updatePageData() {
    let obj = JSON.parse(localStorage.getItem('planetsCalc')) || {}
    let getValue = (v) => parseInt($('#' + v)[0].textContent.replace(/\s/g, ''))

    if (!obj) return;
    for (let mode in obj) {
        let obj1 = obj[mode]
        if (!obj1) return;
        updateCol(mode, obj1);
        for (let i in dataOutput) { // форматировать данные Планов
            let htmlElem = $('#' + dataOutput[i] + 'plan')[0]
            let num1 = getValue(dataOutput[i] + 'plan')
            let num2 = getValue(dataOutput[i] + 'actually')
            let r = num1 - num2
            htmlElem.textContent = (r <= 0 ? "" : "+") + r.toLocaleString()
        }
    }
    updateCol('result', obj.plan)
    calculateTotal(obj)

    function updateCol(mode, obj) {
        dataOutput.forEach(e => $('#' + e + mode)[0].textContent = 0); // сбросить счётчики
        for (let planka in obj) {
            let plankalvl = obj[planka] - 1
            let plankaIndex = planets.Name.indexOf(planka)
            if (plankalvl == -1) continue
            for (let i in dataOutput) {
                let num1, num2
                let htmlElem = $('#' + dataOutput[i] + mode)[0]

                if (mode == 'result') { // обновить результат
                    num1 = getValue(dataOutput[i] + 'actually')
                    num2 = getValue(dataOutput[i] + 'plan')
                } else {
                    num1 = getValue(dataOutput[i] + mode)
                    if (modifiers[i]) {
                        num2 = levels[dataOutput[i]][plankalvl] * planets[modifiers[i]][plankaIndex] / 100
                    } else {
                        num2 = levels[dataOutput[i]][plankalvl]
                    }
                }
                htmlElem.textContent = (num1 + num2).toLocaleString() // отобразить
                if (mode == 'result') formatResult(dataOutput[i])
            }
        }
    }
    function formatResult(item) {
        let htmlElem = $('#' + item + 'result')[0]
        let result = getValue(item + 'result')
        let actually = getValue(item + 'actually')

        if (result > actually) {
            $(htmlElem).css("color", "green");
        } else if (result < actually) {
            $(htmlElem).css("color", "red");
        } else {
            $(htmlElem).css("color", "");
        }
    }
    function calculateTotal(obj) {
        dataTotal.forEach(e => $('#' + e + 'result')[0].textContent = 0); // сбросить счётчики
        for (let planka in obj.plan) {
            let plankaIndex = planets.Name.indexOf(planka)
            if (obj.plan[planka] == 0) continue
            for (let i in dataTotal) {
                let num1, num2 = 0, totalLvl
                let PlanIndexLvl = obj.plan[planka] - 1
                let ActuallyIndexLvl = (obj.actually[planka] || 0) - 1
                let htmlElem = $('#' + dataTotal[i] + 'result')[0]

                num1 = getValue(dataTotal[i] + 'result')
                for (let level = ActuallyIndexLvl; PlanIndexLvl > level; level++) {
                    let data = levels[dataTotal[i]][level + 1] || 0
                    num2 = num2 + data
                }
                let r = num1 + num2
                htmlElem.textContent = (dataTotal[i] == 'TimeToUpgrade') ? fixTime(r) : r.toLocaleString() // отобразить
            }
        }
    }
    console.log(obj)
}
// отобразить данные 
function loadUserData() {
    let selects = document.querySelectorAll('td > select')
    let data = JSON.parse(localStorage.getItem('planetsCalc')) || {}
    if (!data) return;
    for (let select in selects) {
        let index = select
        let isPlan = false

        if (!(select % 2 == 0)) {
            index--
            isPlan = true
        }
        index = index / 2
        let obj = data[(isPlan) ? 'plan' : 'actually']
        if (!obj) continue;
        let val = obj[planets.Name[index]]
        if (!val) continue;
        $(selects[select]).val(val);
        if (isPlan) { // заблокировать плановые лавлы ниже актуальных 
            let value = $(selects[select - 1]).val()
            for (let i = 0; $(selects[select]).children().length > i; i++) {
                $(selects[select][i]).prop('disabled', value > i)
            }
        }
    }
    updatePageData()
}
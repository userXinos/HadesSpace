"use strict";
import 'regenerator-runtime/runtime'

export async function start() {
    let planets = await import('../data/planetsData').then((m) => m.data.yellowstarTable)
    let levels = await import('../data/planet_levelsData').then((m) => m.data)
    let dataOutput = ['CreditStorage', 'FuelStorage', 'CreditsPerHour', 'FuelPerHour', 'ShipmentsCRValuePerDay']
    let modifiers = ['CreditStorageModifier', 'FuelStorageModifier', 'CreditIncomeModifier', 'FuelIncomeModifier', 'CreditShipmentModifier']
    let dataTotal = ['Cost', 'TimeToUpgrade']
    let customTable = {
        Name: 'DONTFIXTABLE',
        TID: planets.TID,
        lvl: [],
        plan: [],
        maxLevel: planets.maxLevel
    }

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
    for (let i in planets.Name) {
        let select = ''
        for (let lvl = 0; planets.MaxUpgradeLevel[i] + 1 > lvl; lvl++) {
            select += `<option>${lvl}</option>`
        }
        customTable.lvl.push(`<select onchange="changeLvl(this,'${i}')"> ${select} </select>`)
        customTable.plan.push(`<select onchange="changeLvl(this,'${i}', 'plan')"> ${select} </select>`)
    }
    generatePageTables(customTable)
        .then(() => loadUserData())

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
        let result = {}
        let getSafeVar = (mode, path) => {
            let value
            try {
                value = (result[mode][path] == undefined) ? 0 : result[mode][path]
            } catch{
                value = 0
                result[mode] = {}
            }
            return value
        }

        if (!obj) return;
        for (let mode in obj) {
            let obj1 = obj[mode]
            if (!obj1) return;
            updateCol(mode, obj1);
        }
        for (let i of dataOutput) { // вычислить прирост плана
            let num1 = getSafeVar('plan', i)
            let num2 = getSafeVar('actually', i)
            result.plan[i] = num1 - num2
        }
        updateCol('result', obj.plan)
        if (Object.keys(result).length !== 0) { // отобразить данные
            dataOutput.forEach(e => {
                for (let mode in result) {
                    let v = result[mode][e]
                    if (!v) v = 0
                    $('#' + e + mode)[0].textContent = (
                        ((mode == 'plan' ? (v <= 0 ? '' : '+') : '')) // форматировать планы 
                        + v.toLocaleString()
                    )
                }
            })
        }
        calculateTotal(obj)

        function updateCol(mode, obj) {
            for (let planka in obj) {
                let plankalvl = obj[planka] - 1
                let plankaIndex = planets.Name.indexOf(planka)
                if (plankalvl == -1) continue
                for (let i in dataOutput) {
                    let num1, num2

                    if (!result[mode]) result[mode] = {}
                    if (mode == 'result') { // обновить результат
                        num1 = getSafeVar('plan', dataOutput[i])
                        num2 = getSafeVar('actually', dataOutput[i])
                    } else {
                        num1 = result[mode][dataOutput[i]] || 0
                        if (modifiers[i]) {
                            num2 = levels[dataOutput[i]][plankalvl] * planets[modifiers[i]][plankaIndex] / 100
                        } else {
                            num2 = levels[dataOutput[i]][plankalvl]
                        }
                    }
                    result[mode][dataOutput[i]] = num1 + num2
                    if (mode == 'result') formatResult(dataOutput[i])
                }
            }
        }
        function formatResult(i) {
            let htmlElem = $('#' + i + 'result')[0]
            let num1 = getSafeVar('result', i)
            let num2 = getSafeVar('actually', i)
            if (num1 > num2) {
                $(htmlElem).css("color", "green");
            } else if (num1 < num2) {
                $(htmlElem).css("color", "red");
            } else {
                $(htmlElem).css("color", "");
            }
        }
        function calculateTotal(obj) {
            for (let planka in obj.plan) {
                let plankaIndex = planets.Name.indexOf(planka)
                if (obj.plan[planka] == 0) continue
                for (let i of dataTotal) {
                    let num1, num2 = 0
                    let PlanIndexLvl = obj.plan[planka] - 1
                    let ActuallyIndexLvl = (obj.actually[planka] || 0) - 1

                    num1 = (result[i] == undefined) ? 0 : result[i]
                    for (let level = ActuallyIndexLvl; PlanIndexLvl > level; level++) {
                        let data = levels[i][level + 1] || 0
                        num2 = num2 + data
                    }
                    result[i] = num1 + num2
                }
            }
            dataTotal.forEach(e => { // отобразить данные
                let v = result[e]
                if (!v) v = 0
                $('#' + e + 'result')[0].textContent =
                    (e == 'TimeToUpgrade') ? fixTime(v) : v.toLocaleString()
            })
        }
        //console.log(obj)
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
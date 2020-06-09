'use strict';
require('regenerator-runtime/runtime');

export async function start() {
  const Data = await import('../data/planetsData').then((m) => m.data.yellowstarTable);
  const levels = await import('../data/planet_levelsData').then((m) => m.data);
  const TradingStations = await import('../data/spacebuildingsData').then(((m) => m.data.TradingStation));
  const keys = ['CreditStorage', 'FuelStorage', 'CreditsPerHour', 'FuelPerHour', 'ShipmentsCRValuePerDay'];
  const keysModifiers = ['CreditStorageModifier', 'FuelStorageModifier', 'CreditIncomeModifier', 'FuelIncomeModifier', 'CreditShipmentModifier'];
  const keysTotal = ['Cost', 'TimeToUpgrade'];
  const keysAliasesTS = {
    ShipmentsCRValuePerDay: 'TotalShipmentCRPerDay',
    Cost: 'Cost',
    TimeToUpgrade: 'ConstructionTime',
  };

  $('h1').append(`${getStr('planetscalc')}`);
  const body = $('body');
  body.append(`<title>${getStr('planetscalc')}</title>`);
  body.append($('<table/>', {
    class: 'planetsCalc',
  }));
  for (const i of keys) {
    let td = '';
    const rows = ['actually', 'plan', 'result'];

    td += $('<td/>', { // имена rows
      text: getStr(i),
    })[0].outerHTML;
    rows.forEach((e) => {
      td += $('<td/>', {
        id: i + e,
        text: 0,
      })[0].outerHTML;
    });
    $('table.planetsCalc').append($('<tr/>', {
      html: td,
    }));
  }
  for (const i of keysTotal) {
    let td = '';
    td += $('<td/>', { // имена rows
      text: getStr(i),
    })[0].outerHTML;
    td += $('<td/>', {
      id: i + 'result',
      text: 0,
      colspan: 3,
      style: 'font-weight: bold',
    })[0].outerHTML;
    $('table.planetsCalc').append($('<tr/>', {
      html: td,
    }));
  }
  body.append($('<div/>', { // кнопки
    class: 'resetButtons',
    html: `<button class = "resetButtonAll" name="button" onclick="reset()">${getStr('resetAll')}</button>
                <button name="button" onclick="reset('plan')">${getStr('resetPlan')}</button>`,
  }));

  // добавить торги
  for (let i = 0; TradingStations.MaxOnOwnSolarSystem > i; i++) {
    Data.TID.push(TradingStations.TID);
    Data.Name.push(TradingStations.Name + '_' + i);
    Data.MaxUpgradeLevel.push(TradingStations.maxLevel);
    Data.maxLevel++;
  }

  const customTable = {
    Name: 'DONTFIXTABLE',
    TID: Data.TID,
    lvl: [],
    plan: [],
    maxLevel: Data.maxLevel,
  };

  for (const i in Data.Name) {
    let select = '';
    for (let lvl = 0; Data.MaxUpgradeLevel[i] + 1 > lvl; lvl++) {
      select += `<option>${lvl}</option>`;
    }
    customTable.lvl.push(`<select onchange="changeLvl(this.value,'${i}')"> ${select} </select>`);
    customTable.plan.push(`<select onchange="changeLvl(this.value,'${i}', true)"> ${select} </select>`);
  }

  generatePageTables(customTable)
      .then(() => loadUserData());

  // колбек выбора лавлов
  window.changeLvl = function(index, itemIndex, isPlan = false) {
    index = parseInt(index);
    const data = JSON.parse(localStorage.getItem('planetsCalc')) || {};
    const item = Data.Name[itemIndex];
    let obj;

    if (!data.actually) data.actually = {};
    if (!data.plan) data.plan = {};
    if (isPlan) {
      obj = data.plan;
    } else {
      obj = data.actually;
    }
    obj[item] = index;
    if (!isPlan) { // подогнать план под уровень
      if (data.plan[item]) {
        if (data.plan[item] < index) {
          data.plan[item] = index;
        }
      } else {
        data.plan[item] = index;
      }
    }
    localStorage.setItem('planetsCalc', JSON.stringify(data));
    loadUserData();
  };
  // колбек кнопок
  window.reset = function(isPlan) {
    if (!isPlan) {
      const msg = confirm('Reset all? Ar u serious ?');
      if (msg) {
        localStorage.removeItem('planetsCalc');
      } else {
        return;
      }
    } else {
      const obj = JSON.parse(localStorage.getItem('planetsCalc')) || {};
      if (obj.plan) {
        for (const i in obj.plan) {
          obj.plan[i] = obj.actually[i];
        }
      } else {
        obj.plan = {};
      }
      localStorage.setItem('planetsCalc', JSON.stringify(obj));
    }
    location.reload();
  };
  // вычислить данные
  function updatePageData() {
    const obj = JSON.parse(localStorage.getItem('planetsCalc')) || {};
    const result = {};
    const getSafeVar = (mode, path) => {
      let value;
      try {
        value = (result[mode][path] == undefined) ? 0 : result[mode][path];
      } catch {
        value = 0;
        result[mode] = {};
      }
      return value;
    };

    if (!obj) return;
    for (const mode in obj) {
      const obj1 = obj[mode];
      if (!obj1) return;
      updateCol(mode, obj1);
    }
    for (const i of keys) { // вычислить прирост плана
      const num1 = getSafeVar('plan', i);
      const num2 = getSafeVar('actually', i);
      result.plan[i] = num1 - num2;
    }
    updateCol('result', obj.plan);
    if (Object.keys(result).length !== 0) { // отобразить данные
      keys.forEach((e) => {
        for (const mode in result) {
          let v = result[mode][e];
          if (!v) v = 0;
          $('#' + e + mode)[0].textContent = (
            ((mode == 'plan' ? (v <= 0 ? '' : '+') : '')) + // форматировать планы
              v.toLocaleString()
          );
        }
      });
    }
    calculateTotal(obj);

    function updateCol(mode, obj) {
      for (const item in obj) {
        const itemLvl = obj[item] - 1;
        const itemIndex = Data.Name.indexOf(item);

        if (itemLvl == -1) continue;
        if (item.includes('TradingStation')) {

        }
        for (const i in keys) {
          let num1;
          let num2;

          if (!result[mode]) result[mode] = {};
          if (mode == 'result') { // обновить результат
            num1 = getSafeVar('plan', keys[i]);
            num2 = getSafeVar('actually', keys[i]);
          } else {
            num1 = result[mode][keys[i]] || 0;
            if (keysModifiers[i]) {
              num2 = levels[keys[i]][itemLvl] * Data[keysModifiers[i]][itemIndex] / 100;

              if (item.includes('TradingStation') && keys[i] in keysAliasesTS) {
                num2 = TradingStations[keysAliasesTS[keys[i]]][itemLvl];
              }
            } else {
              num2 = levels[keys[i]][itemLvl];
            }
          }
          result[mode][keys[i]] = num1 + num2;
          if (mode == 'result') formatResult(keys[i]);
        }
      }
    }
    function formatResult(i) {
      const htmlElem = $('#' + i + 'result')[0];
      const num1 = getSafeVar('result', i);
      const num2 = getSafeVar('actually', i);
      if (num1 > num2) {
        $(htmlElem).css('color', 'green');
      } else if (num1 < num2) {
        $(htmlElem).css('color', 'red');
      } else {
        $(htmlElem).css('color', '');
      }
    }
    function calculateTotal(obj) {
      for (const item in obj.plan) {
        if (obj.plan[item] == 0) continue;
        for (const i of keysTotal) {
          let num1 = 0;
          let num2 = 0;
          const PlanIndexLvl = obj.plan[item] - 1;
          const ActuallyIndexLvl = (obj.actually[item] || 0) - 1;

          num1 = (result[i] == undefined) ? 0 : result[i];
          for (let level = ActuallyIndexLvl; PlanIndexLvl > level; level++) {
            let data = levels[i][level + 1] || 0;

            if (item.includes('TradingStation') && i in keysAliasesTS) {
              data = TradingStations[keysAliasesTS[i]][level + 1] || 0;
            }
            num2 = num2 + data;
          }
          result[i] = num1 + num2;
        }
      }
      keysTotal.forEach((e) => { // отобразить данные
        let v = result[e];
        if (!v) v = 0;
        $('#' + e + 'result')[0].textContent =
            (e == 'TimeToUpgrade') ? fixTime(v) : v.toLocaleString();
      });
    }
    // console.log(obj);
  }
  // отобразить данные
  function loadUserData() {
    const selects = document.querySelectorAll('td > select');
    const data = JSON.parse(localStorage.getItem('planetsCalc')) || {};
    if (!data) return;
    for (const select in selects) {
      let index = select;
      let isPlan = false;

      if (!(select % 2 == 0)) {
        index--;
        isPlan = true;
      }
      index = index / 2;
      const obj = data[(isPlan) ? 'plan' : 'actually'];
      if (!obj) continue;
      const val = obj[Data.Name[index]];
      if (!val) continue;
      $(selects[select]).val(val);
      if (isPlan) { // заблокировать плановые лавлы ниже актуальных
        const value = $(selects[select - 1]).val();
        for (let i = 0; $(selects[select]).children().length > i; i++) {
          $(selects[select][i]).prop('disabled', value > i);
        }
      }
    }
    updatePageData();
  }
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

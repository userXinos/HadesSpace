import { getStr } from './getString.js';
import { switchLang, getLangVal } from './header.js';
import { } from "./fixPage";

// перелючение языка
window.func = function (v) {
    switchLang(v)
}
// получить код языка для ф-и выше 
window.func2 = function (v) {
    getLangVal(v)
}
onscroll = function vverh() {
    document.getElementById('buttonTop').style.display = (window.pageYOffset > '200' ? 'block' : 'none');
}
window.ScrollUp = function () {
    let s = document.body.scrollTop || window.pageYOffset;
    let t = setInterval(
        function () {
            if (s > 0) scroll(0, s -= 70);
            else clearInterval(t)
        }, 5
    );
}
window.generateIndexMenu = function () {
    let menu = document.querySelectorAll('div.categories')[0]
    let menuContent = {
        modules: {
            name: getStr('TID_SHIP_UPGRADE_DLG_TITLE'),
            list: ['Trade', 'Mining', 'Weapon', 'Shield', 'Support'],
        },
        sections: {
            name: getStr('Sections'),
            list: ['ships', 'cerberus', 'stars'],
        }
    }
    for (let item of Object.keys(menuContent)) {
        let index = Object.keys(menuContent).indexOf(item)
        menu.querySelectorAll('section > h2')[index]['innerHTML'] = menuContent[item]['name']
        for (let page of menuContent[item]['list']) {
            let name
            if (item == 'modules') {
                name = 'typeMod' + page
            } else {
                name = page
            }
            name = getStr(name);
            let path = `${page.toLowerCase()}.html`;
            let paragraph = `<li><a href="${path}">${name}</a></li>`;
            menu.querySelectorAll('section > ul')[index]['innerHTML'] += paragraph;
        }
    }
}

import { generatePageTables, generateCerberusInfo, generateYSSectors } from '../js/outputData.js';

// NEEDED refactoring
window.generatePageTables = function (typeData, cacategory) {
    generatePageTables(typeData, cacategory);
}
// NEEDED refactoring (!!!)
window.generateYSSectors = async function () {
    $('h2').append(getStr('content'));
    $('h1').append(`${getStr('TID_YELLOW_STAR')}`);
    $('body').append(`<title>${getStr('TID_YELLOW_STAR')}</title>`);
    $('body').append(`<blockquote>${getStr('TID_YELLOW_STAR_DESCR')}</blockquote>`);

    let title = `<a href="#${'sectors'}" name="${'sectors'}">${getStr('sectors')}</a>`;
    let titleAndIcom = `<div class="title"><div class="title-text">${title}</div></div>`;
    let listItem = `<li><span><a href="#${'sectors'}">${getStr('sectors')}</a></span></li>`;
    $('body').append(titleAndIcom);
    $('ol').append(listItem);
    await generatePageTables('yellow_star_sectors');

    title = `<a href="#${'lvlsPlanets'}" name="${'lvlsPlanets'}">${getStr('lvlsPlanets')}</a>`;
    titleAndIcom = `<div class="title"><div class="title-text">${title}</div></div>`;
    listItem = `<li><span><a href="#${'lvlsPlanets'}">${getStr('lvlsPlanets')}</a></span></li>`;
    $('body').append(titleAndIcom);
    $('ol').append(listItem);
    await generatePageTables('planet_levels');

    title = `<a href="#${'planets'}" name="${'planets'}">${getStr('planets')}</a>`;
    titleAndIcom = `<div class="title"><div class="title-text">${title}</div></div>`;
    listItem = `<li><span><a href="#${'planets'}">${getStr('planets')}</a></span></li>`;
    $('body').append(titleAndIcom);
    $('ol').append(listItem);
    await generatePageTables('planets', null, 'yellowstarTable');

    title = `<a href="#${'colonizationPlanets'}" name="${'colonizationPlanets'}">${getStr('colonizationPlanets')}</a>`;
    titleAndIcom = `<div class="title"><div class="title-text">${title}</div></div>`;
    listItem = `<li><span><a href="#${'colonizationPlanets'}">${getStr('colonizationPlanets')}</a></span></li>`;
    $('body').append(titleAndIcom);
    $('ol').append(listItem);
    await generatePageTables('colonize_prices');
}
// NEEDED refactoring
window.setBaseData = function (typeData, cacategory) {
    let cacategoryMod
    if (typeData == 'modules') {
        cacategoryMod = 'typeMod' + cacategory
    }
    if (cacategory == 'player') {
        cacategoryMod = 'ships'
    }
    $('h2').append(getStr('content'));
    $('h1').append(`${getStr(cacategoryMod || cacategory)}`);
    $('body').append(`<title>${getStr(cacategoryMod || cacategory)}</title>`);
    generatePageTables(typeData, cacategory);
}

window.setFlagshipModules = function () {
    let flagshipModules = `<a href="flagshipModules" name="flagshipModules">${getStr('flagshipModules')}</a>`
    $('body').append(`<div class="title"><div class="title-text"><h1>${flagshipModules}<h1></div></div>`);
    generatePageTables('modules', 'flagship');
}
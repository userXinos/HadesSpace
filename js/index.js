"use strict";

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
    document.getElementById('buttonTop').style.display = (window.pageYOffset > '300' ? 'block' : 'none');
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

import { generatePageTables } from '../js/outputData.js';

window.generatePageTables = generatePageTables
window.getStr = getStr
window.setBaseData = async function (typeData, cacategory) {
    let title = getStr( // hehe (TODO)
        (typeData == 'modules') ? 'typeMod' + cacategory :
            (typeData == 'yellowStar') ? 'TID_YELLOW_STAR' :
                (typeData == 'redStar') ? 'TID_RED_STAR' :
                    (cacategory == 'player') ? 'ships' :
                        'cerberus'
    )
    $('h2').append(getStr('content'));
    $('h1').append(`${title}`);
    $('body').append(`<title>${title}</title>`);
    if (typeData == 'modules' || typeData == 'ships') {
        await generatePageTables(typeData, cacategory);
    }
}
window.genTitle = function (href_html) {
    $('body').append($('<div/>', {
        class: 'title',
        html: $('<div/>', {
            class: 'title-text',
            html: href_html
        })[0]['outerHTML'],
    }));
}
window.genOl = function (span_html) {
    $('ol').append($('<li/>', {
        html: span_html
    }));
}
window.genDesc = function (str) {
    $('body').append($('<blockquote/>', {
        html: getStr(str)
    }));
}

window.setFlagshipModules = async function () {
    let flagshipModules = `<a href="flagshipModules" name="flagshipModules">${getStr('flagshipModules')}</a>`
    $('body').append(`<div class="title"><div class="title-text"><h1>${flagshipModules}<h1></div></div>`);
    await generatePageTables('modules', 'flagship');
}

// export { // TODO: хз пока как это сделать
//     genTitle,
//     genOl,
//     genDesc
// }
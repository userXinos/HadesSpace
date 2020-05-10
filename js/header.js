"use strict";
import { getStr } from './getString.js';
import { setCookie } from './cookie.js';
import * as  modulesData from '../data/modulesData.js';

let locList = {
    'English': 'en',
    'Pусский': 'ru',
    'Français': 'fr',
    'Deutsch': 'de',
    'Español': 'es',
    'Italiano': 'it',
    'Português': 'pt',
    '한국어': 'ko',
    '日本語': 'jp',
    '简体中文': 'zh-si',
};
let menu = document.querySelectorAll('ul.menu')[0]

// основа
menu.querySelectorAll('li > a > span')[0]['innerHTML'] = getStr('home');

let typeModules = ['Trade', 'Mining', 'Weapon', 'Shield', 'Support'];
for (let typeMod of typeModules) {
    let modules = modulesData.byTypes[typeMod.toLowerCase()];
    let name = getStr('typeMod' + typeMod);
    let path = `${typeMod.toLowerCase()}.html`;
    let heading = `<a href="${path}"><span>${name}</span></a><ul class="subMenu">`;
    let list = heading;
    for (let i of modules) {
        let module = modulesData.data[i]
        let name = getStr(module.TID);
        list += `<li><a href="${path}#${module.Name}"><span>${name}</span></a></li>`
    }
    list += '</ul>';
    list = $('<li/>', {
        'class': typeMod,
        html: list
    })[0]['outerHTML'];
    menu.innerHTML += list;
}
// блок языков
let langs = locList;
for (let l of Object.keys(langs)) {
    // основное меню
    let lang = `<input value="${l}" onclick="func('${locList[l]}')" type="button">`;
    menu.querySelectorAll('div.langs > ul')[0]['innerHTML'] += lang;
    // мини-меню языка 
    lang = `<option>${l}</option>\n`
    menu.querySelectorAll('select.compactLangs')[0]['innerHTML'] += lang
};
function switchLang(l) {
    setCookie('language', l);
    location.reload()
};
function getLangVal(k) {
    switchLang(langs[k]);
};

// показать блок языков
let btn = menu.children[0]
btn.onclick = function (e) {
    let element = document.querySelector(".langs");
    if (element.classList.contains("show-block")) {
        element.classList.remove("show-block");
    } else {
        element.classList.add("show-block");
    }
}
export {
    switchLang,
    getLangVal
}
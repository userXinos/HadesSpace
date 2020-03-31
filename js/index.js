import { getStr } from './getString.js';
import { switchLang, getLangVal} from './header.js';
import { } from "./fixPage";

// перелючение языка
window.func = function(v){
    switchLang(v)
}
// получить код языка для ф-и выше 
window.func2 = function(v){
    getLangVal(v)
}
onscroll = function vverh() {
    document.getElementById('buttonTop').style.display = (window.pageYOffset > '200' ? 'block' : 'none');
    }
    window.ScrollUp = function(){
      let s = document.body.scrollTop||window.pageYOffset;
      let t = setInterval(
        function(){
          if(s>0)scroll(0,s-=70);
          else clearInterval(t)},5
          );
      }
window.generateIndexMenu = function(){
    let menu = document.querySelectorAll('div.categories')[0]
    let menuContent = {
        modules: {
            name: getStr('TID_SHIP_UPGRADE_DLG_TITLE'),
            list: ['Trade','Mining','Weapon','Shield','Support'],
        },
        sections: {
            name: getStr('Sections'),
            list: ['ships','Cerberus'],
        }
    }
    for(let item of Object.keys(menuContent)){
    let index = Object.keys(menuContent).indexOf(item)
    menu.querySelectorAll('section > h2')[index]['innerHTML'] = menuContent[item]['name']
        for (let page of menuContent[item]['list']){
            let name
            if(item == 'modules'){
            name = 'typeMod'+page
            }else{
            name = page
            }
            name = getStr(name);
            let path = `${page.toLowerCase()}.html`;
            let paragraph =`<li><a href="${path}">${name}</a></li>`;
            menu.querySelectorAll('section > ul')[index]['innerHTML'] += paragraph;
        }
    }
}

import { generatePageTables, generateCerberusInfo } from '../js/outputData.js';

window.generatePageTables = function(typeData, cacategory){
    generatePageTables(typeData, cacategory);
}

window.setBaseData = function(typeData, cacategory, isCerb = false){
    let cacategoryMod
    if(typeData == 'modules'){
        cacategoryMod = 'typeMod' + cacategory
    }
    if(cacategory == 'player'){
        cacategoryMod = 'ships'
    }
    $('h2').append(getStr('content'));
    $('h1').append(`${getStr(cacategoryMod||cacategory)}`);
    $('body').append(`<title>${getStr(cacategoryMod||cacategory)}</title>`);
    (isCerb) ? generateCerberusInfo(typeData, cacategory) : generatePageTables(typeData, cacategory);
}

window.setFlagshipModules = function(){
    let flagshipModules = `<a href="flagshipModules" name="flagshipModules">${getStr('flagshipModules')}</a>`
    $('body').append(`<div class="title"><div class="title-text"><h1>${flagshipModules}<h1></div></div>`);
    generatePageTables('modules', 'flagship');
}
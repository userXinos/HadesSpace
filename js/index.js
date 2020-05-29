"use strict";

import { getStr } from './getString.js';
import { switchLang, getLangVal } from './header.js';
import { } from "./fixPage";

window.switchLang = switchLang
window.getLangVal = getLangVal

$(window).scroll((e) => {
    document.getElementById('buttonTop').style.display = (window.pageYOffset > '300' ? 'block' : 'none');
});

import { generatePageTables } from '../js/outputData.js';

window.generatePageTables = generatePageTables
window.getStr = getStr
window.setBaseData = async function (typeData, cacategory, table = null) {
    function getTitleKey() {
        let data = {
            modules: 'typeMod' + cacategory,
            ships: (cacategory == 'player') ? 'ships' : 'cerberus',
            spacebuildings: 'TID_PRODUCTION_DLG_STATIONS',
            player_goals: 'TID_EMPIRE_OBJECTIVES',
            alliance_levels: 'TID_CORP_LEVELS_LABEL'
        }
        return table || data[typeData] || typeData
    }
    let title = getStr(getTitleKey())
    $('h2').append(getStr('content'));
    $('h1').append(`${title}`);
    $('body').append(`<title>${title}</title>`);
    await generatePageTables.apply(null, arguments);

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
window.planetsCalc = function () {
    import('./planetsCalc').then((i) => {
        i.start()
    })
}

// export { // TODO: хз пока как это сделать
//     genTitle,
//     genOl,
//     genDesc
// }
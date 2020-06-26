'use strict';

import {getStr} from './getString.js';
import {switchLang, getLangVal} from './header.js';
import { } from './fixPage';

window.switchLang = switchLang;
window.getLangVal = getLangVal;

$(window).scroll(() => {
  document.getElementById('buttonTop').style.display = (window.pageYOffset > '300' ? 'block' : 'none');
});

import {generatePageTables} from './outputData';

window.generatePageTables = generatePageTables;
window.getStr = getStr;
window.setBaseData = async function(typeData, cacategory, table = null) {
  function getTitleKey() {
    const data = {
      modules: 'typeMod' + cacategory,
      ships: (cacategory == 'player') ? 'ships' : 'cerberus',
      spacebuildings: 'TID_PRODUCTION_DLG_STATIONS',
      player_goals: 'TID_EMPIRE_OBJECTIVES',
      alliance_levels: 'TID_CORP_LEVELS_LABEL',
    };
    return table || data[typeData] || typeData;
  }
  const title = getStr(getTitleKey());
  $('h2').append(getStr('content'));
  $('h1').append(`${title}`);
  $('body').append(`<title>${title}</title>`);
  await generatePageTables.apply(null, arguments);
};
window.genTitle = function(hrefHtml) {
  $('body').append($('<div/>', {
    class: 'title',
    html: $('<div/>', {
      class: 'title-text',
      html: hrefHtml,
    })[0]['outerHTML'],
  }));
};
window.genOl = function(spanHtml) {
  $('ol').append($('<li/>', {
    html: spanHtml,
  }));
};
window.genDesc = function(str) {
  $('body').append($('<blockquote/>', {
    html: getStr(str),
  }));
};
window.planetsCalc = function() {
  import('./planetsCalc').then((i) => {
    i.start();
  });
};

// export { // TODO: хз пока как это сделать
//     genTitle,
//     genOl,
//     genDesc
// }

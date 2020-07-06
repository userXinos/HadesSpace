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
window.setBaseData = async function(args) {
  const title = getStr(args.titleKey);
  $('h2').append(getStr('content'));
  $('h1').append(`${title}`);
  $('body').append(`<title>${title}</title>`);
  await generatePageTables(args);
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
window.planetsCalc = function() {
  import('./planetsCalc').then((i) => {
    i.start();
  });
};
window.staticStatsInfo = function(header, text) {
  const elem = $('<div/>', {
    class: 'infoStats',
    html: $('<div/>', {
      class: 'test',
      html: `<button id="close"></button> <p>${header}</p> <p>${text}</p>`,
    })[0].outerHTML,
    click: (e) => { // рандомный клик
      if (!$(e.target).hasClass('infoStats')) return;
      hide();
    },
  });
  const hide = () => {
    elem.remove();
    $('html').css('overflow', 'auto');
  };

  $('body').append(elem);
  $('html').css('overflow', 'hidden');
  $('#close').click(() => hide());
};

// export { // TODO: хз пока как это сделать
//     genTitle,
//     genOl,
//     genDesc
// }

'use strict';
import {locList} from './getString.js';

function switchLang(l) {
  localStorage.setItem('language', l);
  location.reload();
}
function getLangVal(k) {
  switchLang(locList[k]);
}

window.showButtonLangs = function(show = true) { // показать меню языков
  const divlangs = $('div.langs');

  if (divlangs.css('display') == 'none') {
    if (show) {
      divlangs.show();
    }
  } else {
    divlangs.hide();
  }
};
$(document).ready(function() {
  $(document).click((e) => { // спрятать меню языков при рандомном клике
    if ($(e.target).attr('id') != 'buttonLangs') {
      showButtonLangs(false);
    }
  });

  let oldScrollY = 0; // спрятать шапку при скролле
  $(window).scroll(() => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    const dY = scrolled - oldScrollY;

    if (dY > 0) {
      $('header').fadeOut();
      showButtonLangs(false);
    } else {
      $('header').css('display', 'block');
    }
    oldScrollY = scrolled;
  });
});
export {
  switchLang,
  getLangVal,
};

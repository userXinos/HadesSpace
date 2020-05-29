"use strict";
import { locList } from './getString.js';

function switchLang(l) {
    localStorage.setItem('language', l);
    location.reload()
};
function getLangVal(k) {
    switchLang(locList[k]);
};

window.showButtonLangs = function (show = true) { // показать меню языков
    if ($('div.langs').css('display') == 'none') {
        if (show) {
            $('div.langs').show()
        }
    } else {
        $('div.langs').hide()
    }
}
$(document).ready(function () {

    $(document).click((e) => { // спрятать меню языков при рандомном клике
        if ($(e.target).attr('id') != 'buttonLangs') {
            showButtonLangs(false)
        }
    });

    let oldScrollY = 0; // спрятать шапку при скролле
    $(window).scroll((e) => {
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        let dY = scrolled - oldScrollY;

        if (dY > 0) {
            $('header').fadeOut();
            showButtonLangs(false)
        } else {
            $('header').css("display", "block");
        }
        oldScrollY = scrolled;
    })
})
export {
    switchLang,
    getLangVal
}
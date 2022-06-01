
// https://github.com/ndelvalle/v-click-outside/issues/238#issuecomment-725378716

import { DirectiveBinding } from '@vue/runtime-core';

interface ClickOutsideElement extends HTMLElement {
    __vueClickEventHandler__: (event: MouseEvent) => void
}

export default {
    beforeMount(el: ClickOutsideElement, binding: DirectiveBinding) {
        const ourClickEventHandler = (event: MouseEvent) => {
            if (! el.contains(event.target as HTMLElement) && el !== event.target) {
                binding.value(event);
            }
        };

        el.__vueClickEventHandler__ = ourClickEventHandler;

        document.addEventListener('click', ourClickEventHandler);
    },
    unmounted(el: ClickOutsideElement) {
        document.removeEventListener('click', el.__vueClickEventHandler__);
    },
};

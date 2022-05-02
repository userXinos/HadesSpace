
// https://github.com/ndelvalle/v-click-outside/issues/238#issuecomment-713872610


export default {
    beforeMount(el, binding) {
        const ourClickEventHandler = (event) => {
            if (!el.contains(event.target) && el !== event.target) {
                binding.value(event);
            }
        };
        el.__vueClickEventHandler__ = ourClickEventHandler;

        document.addEventListener('click', ourClickEventHandler);
    },
    unmounted(el) {
        document.removeEventListener('click', el.__vueClickEventHandler__);
    },
};

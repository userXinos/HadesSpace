import { registerSW } from 'virtual:pwa-register';

window.addEventListener('load', () => {
    registerSW({ immediate: true });
});

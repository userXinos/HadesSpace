import { registerSW } from 'virtual:pwa-register';

registerSW({
    immediate: true,
    onNeedRefresh: () => {
        console.log('onNeedRefresh');
    },
});

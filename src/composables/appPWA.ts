import { onMounted, onUnmounted, ref } from 'vue';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string; }>;
    prompt(): Promise<void>;
}
declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}

const deferredPrompt = ref<BeforeInstallPromptEvent>();

export default function appPWA() {
    const error = ref<'NOT_PROVIDED'|'NOT_SUPPORTED'|'INSTALLED'>();

    if ('BeforeInstallPromptEvent' in window) {
        error.value = 'NOT_PROVIDED';
    } else {
        error.value = 'NOT_SUPPORTED';
    }

    onMounted(() => {
        if (error.value == 'NOT_PROVIDED') {
            window.addEventListener('beforeinstallprompt', onBeforeinstallprompt);
            window.addEventListener('appinstalled', onAppinstalled);
        }
    });
    onUnmounted(() => {
        window.removeEventListener('beforeinstallprompt', onBeforeinstallprompt);
        window.removeEventListener('appinstalled', onAppinstalled);
    });

    return {
        error,
        install,
    };

    function onBeforeinstallprompt(event: BeforeInstallPromptEvent) {
        event.preventDefault();
        deferredPrompt.value = event;
        error.value = undefined;
    }
    function onAppinstalled() {
        error.value = 'INSTALLED';
        deferredPrompt.value = undefined;
    }
    async function install(): Promise<BeforeInstallPromptEvent['userChoice']|undefined> {
        if (deferredPrompt.value) {
            deferredPrompt.value.prompt();

            const userChoice = await deferredPrompt.value.userChoice;
            deferredPrompt.value = undefined;

            return userChoice;
        }
    }
}

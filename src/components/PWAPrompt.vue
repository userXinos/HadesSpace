<template>
  <div />
</template>

<script>
export default {
    beforeMount() {
        window.addEventListener('beforeinstallprompt', this.beforeInstallPrompt);
    },

    methods: {
        confirm(event) {
            const result = window.confirm('Install as app ?');

            if (result) {
                this.installPWA(event);
            }
        },

        installPWA(event) {
            event.prompt();
            event.userChoice.then((choice) => {
                if (choice.outcome === 'accepted') {
                    // Do something additional if the user chose to install
                } else {
                    // Do something additional if the user declined
                }
            });
        },

        beforeInstallPrompt(event) {
            if (!window.matchMedia('(display-mode: standalone)').matches) {
                event.preventDefault();
                this.confirm(event);
            }
            window.removeEventListener('beforeinstallprompt', this.beforeInstallPrompt);
        },
    },
};
</script>

<template>
  <ModulePage
    type="Weapon"
    portrait="portrait_WhiteStar"
    :post-filter="postFilter"
  />
</template>

<script>
import ModulePage from '@/components/ModulePage.vue';

export default {
    components: { ModulePage },
    methods: {
        postFilter(data) {
            const Laser = { ...data.Laser };

            ['RampDPS', 'RampDPS_BLS', 'RampDPS_WS']
                .forEach((key) => {
                    if (`${key}0` in Laser) {
                        Laser[key] = {
                            '0%+': [...Laser[`${key}0`]],
                            '50%+': [...Laser[`${key}1`]],
                            '100%': [...Laser[`${key}2`]],
                        };
                        delete Laser[`${key}0`];
                        delete Laser[`${key}1`];
                        delete Laser[`${key}2`];

                        data.Laser = Laser;
                    }
                });

            return data;
        },
    },
};
</script>

<template>
  <ModulePage
    type="Weapon"
    portrait="portrait_Sentinel.jpg"
    :post-filter="postFilter"
  />
</template>

<script setup>
import ModulePage from '@/components/ModulePage.vue';

function postFilter(data) {
    ['Laser', 'DualLaser']
        .forEach((modKey) => {
            const mod = { ...data[modKey] };

            ['RampDPS', 'RampDPS_BLS', 'RampDPS_WS']
                .forEach((key) => {
                    if (`${key}0` in mod) {
                        mod[key] = {
                            '■': [...mod[`${key}0`]],
                            '■■': [...mod[`${key}1`]],
                            '■■■': [...mod[`${key}2`]],
                        };
                        delete mod[`${key}0`];
                        delete mod[`${key}1`];
                        delete mod[`${key}2`];

                        data[modKey] = mod;
                    }
                });
        });

    return data;
}
</script>

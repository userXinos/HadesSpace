<template>
  <ModulePage
    type="Weapon"
    portrait="portrait_Sentinel.jpg"
    :post-filter="postFilter"
  />
</template>

<script>

export function fixRampLasers(obj) {
    Object.keys(obj).forEach((k) => {
        if (k.endsWith('Laser')) {
            const mod = { ...obj[k] };

            ['RampDPS', 'RampDPS_BLS', 'RampDPS_WS']
                .forEach((key) => {
                    if (`${key}0` in mod) {
                        if (Array.isArray(mod[`${key}2`])) {
                            const arr = Array(mod[`${key}2`].length);

                            if (!Array.isArray(mod[`${key}0`])) {
                                mod[`${key}0`] = [...arr].fill(mod[`${key}0`]);
                            }
                            if (!Array.isArray(mod[`${key}1`])) {
                                mod[`${key}1`] = [...arr].fill(mod[`${key}1`]);
                            }
                        }

                        mod[key] = {
                            [`_${key}0`]: [...mod[`${key}0`]],
                            [`_${key}1`]: [...mod[`${key}1`]],
                            [`_${key}2`]: [...mod[`${key}2`]],
                        };
                        delete mod[`${key}0`];
                        delete mod[`${key}1`];
                        delete mod[`${key}2`];

                        obj[k] = mod;
                    }
                });
        }
    });
    return obj;
}
</script>
<script setup>
import ModulePage from '@/components/ModulePage.vue';

function postFilter(data) {
    return fixRampLasers(data);
}
</script>

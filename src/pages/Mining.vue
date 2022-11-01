<template>
  <ModulePage
    type="Mining"
    portrait="portrait_Asteroids_cr"
    :post-filter="postFilter"
  />
</template>

<script>
import ModulePage from '@/components/ModulePage.vue';

export default {
    components: { ModulePage },
    methods: {
        postFilter(data) {
            const Genesis = { ...data.Genesis };

            if (Genesis.HydroPerNewAsteroid_YS && Genesis.HydroPerNewAsteroid_WS) {
                Genesis.HydroPerNewAsteroid_YS = Genesis.HydroPerNewAsteroid_YS
                    .map((e, i) => e * Genesis.MaxNewAsteroids[i]);
                Genesis.HydroPerNewAsteroid_WS = Genesis.HydroPerNewAsteroid_WS
                    .map((e, i) => e * Genesis.MaxNewAsteroids[i]);

                data.Genesis = Genesis;
            }

            return data;
        },
    },
};
</script>

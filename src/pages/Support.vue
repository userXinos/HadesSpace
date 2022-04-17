<template>
  <ModulePage
    :type="'support'"
    :post-filter="postFilter"
  />
</template>

<script>
import ModulePage from '@/components/ModulePage.vue';

export default {
    components: { ModulePage },
    methods: {
        postFilter(data) {
            data.Salvage.SalvageHullPercent = {
                RS: data.Salvage.SalvageHullPercent[0],
                WS: data.Salvage.SalvageHullPercent[1],
                // BS: data.Salvage.SalvageHullPercent[2], // тоже самое, что и в КЗ
            };
            return data;
        },
    },
};
</script>

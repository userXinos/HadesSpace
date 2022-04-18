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
            const Salvage = { ...data.Salvage };

            Salvage.SalvageHullPercent = {
                RS: Salvage.SalvageHullPercent[0],
                WS: Salvage.SalvageHullPercent[1],
                // BS: Salvage.SalvageHullPercent[2], // тоже самое, что и в КЗ
            };
            data.Salvage = Salvage;

            return data;
        },
    },
};
</script>
